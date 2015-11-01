'use strict';

var alphabets = require('./alphabets');
var v6 = require('ipv6').v6;
var bignum = require('bignum');

var NUM_MAXVALUE = Math.pow(2, 32) - 1;
var QUAD85 = 85 * 85 * 85 * 85;
var TRIO85 = 85 * 85 * 85;
var DUO85  = 85 * 85;
var SING85 = 85;

var DEFAULT_ENCODING = 'z85';

/* Characters to allow (and ignore) in an encoded buffer */
var IGNORE_CHARS = [
  0x09, /* horizontal tab */
  0x0a, /* line feed, new line */
  0x0b, /* vertical tab */
  0x0c, /* form feed, new page */
  0x0d, /* carriage return */
  0x20  /* space */
];

var ASCII85_ENC_START = '<~';
var ASCII85_ENC_END   = '~>';

/* Function borrowed from noseglid/canumb (github) */
function pad(width, number)
{
  return new Array(1 + width - number.length).join('0') + number;
}

function encodeBignumIPv6(num)
{
  var enctable = alphabets.ipv6.enc;

  var enc = [];
  for (var i = 1; i < 20; ++i) {
    enc.push(enctable[num.mod(85).toNumber()]); /* Ranges between 0 - 84 */
    num = num.div(85);
  }
  enc.push(enctable[num.toNumber()]); /* What's left is also in range 0 - 84 */
  return enc.reverse().join('');
}

function encodeBufferIPv6(buffer)
{
  if (16 !== buffer.length) {
    /* An IPv6 address must be exactly 16 bytes, 128 bits long */
    return false;
  }

  return encodeBignumIPv6(bignum.fromBuffer(buffer));
}

function encodeStringIPv6(string)
{
  var addr = new v6.Address(string);
  if (!addr.isValid()) {
    return false;
  }

  var num = bignum(addr.parsedAddress.map(function(el) {
    return pad(4, el);
  }).join(''), 16);

  return encodeBignumIPv6(num);
}

function decodeStringIPv6(string)
{
  if (20 !== string.length) {
    /* An encoded IPv6 is always (5/4) * 16 = 20 bytes */
    return false;
  }

  var dectable = alphabets.ipv6.dec;
  var i = 0;
  var binary = string.split('').reduceRight(function(memo, el) {
    var num = bignum(dectable[el.charCodeAt(0)]);
    var fact = bignum(85).pow(i++);
    var contrib = num.mul(fact);
    return memo.add(contrib);
  }, bignum(0));

  return v6.Address.fromBigInteger(binary).correctForm();
}

function decodeBufferIPv6(buffer)
{
  return decodeStringIPv6(buffer.toString());
}

function encodeBuffer(buffer, encoding)
{
  if ('z85' === encoding && buffer.length % 4 !== 0) {
    return false;
  }
  var enctable = alphabets[encoding].enc;
  var padding = (buffer.length % 4 === 0) ? 0 : 4 - buffer.length % 4;

  var result = '';
  for (var i = 0; i < buffer.length; i += 4) {

    /* 32 bit number of the current 4 bytes (padded with 0 as necessary) */
    var num = ((buffer[i] << 24) >>> 0) + // Shift right to force unsigned number
        (((i + 1 > buffer.length ? 0 : buffer[i + 1]) << 16) >>> 0) +
        (((i + 2 > buffer.length ? 0 : buffer[i + 2]) <<  8) >>> 0) +
        (((i + 3 > buffer.length ? 0 : buffer[i + 3]) <<  0) >>> 0);

    /* Create 5 characters from '!' to 'u' alphabet */
    var block = [];
    for (var j = 0; j < 5; ++j) {
      block.unshift(enctable[num % 85]);
      num = Math.floor(num / 85);
    }

    block = block.join('');
    if (block === '!!!!!' && 'ascii85' === encoding) {
      block = 'z';
    }
    /* And append them to the result */
    result += block;
  }

  return (('ascii85' === encoding) ? ASCII85_ENC_START : '') +
         result.substring(0, result.length - padding) +
         (('ascii85' === encoding) ? ASCII85_ENC_END : '');
}

function encodeString(string, encoding)
{
  var buffer = new Buffer(string, 'utf8'); // utf8 at all times?
  return encodeBuffer(buffer, encoding);
}

function decodeBuffer(buffer, encoding)
{
  var dectable = alphabets[encoding].dec;

  var dataLength = buffer.length;
  if ('ascii85' === encoding) {
    dataLength -= (ASCII85_ENC_START.length + ASCII85_ENC_END.length);
  }
  
  if ('z85' === encoding && dataLength % 5 !== 0) {
    return false;
  }

  var padding = (dataLength % 5 === 0) ? 0 : 5 - dataLength % 5;

  var bufferStart = ('ascii85' === encoding) ? ASCII85_ENC_START.length : 0;
  var bufferEnd   = bufferStart + dataLength;

  var result = new Buffer(4 * Math.ceil((bufferEnd - bufferStart) / 5));

  var nextValidByte = function(index) {
    if (index < bufferEnd) {
      while (-1 !== IGNORE_CHARS.indexOf(buffer[index])) {
        padding = (padding + 1) % 5;
        index++; // skip newline character
      }
    }
    return index;
  };

  var writeIndex = 0;
  for (var i = bufferStart; i < bufferEnd;) {
    var num = 0;
    var starti = i;

    i = nextValidByte(i);
    num = (dectable[buffer[i]]) * QUAD85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * TRIO85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * DUO85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]) * SING85;

    i = nextValidByte(i + 1);
    num += (i >= bufferEnd ? 84 : dectable[buffer[i]]);

    i = nextValidByte(i + 1);
    
    if ('z85' === encoding && starti + 5 !== i) {
      return false;
    }

    if (num > NUM_MAXVALUE || num < 0) {
      /* Bogus data */
      return false;
    }

    result.writeUInt32BE(num, writeIndex);
    writeIndex += 4;
  }

  return result.slice(0, writeIndex - padding);
}

function decodeString(string, encoding)
{
  if ('ascii85' === encoding) {
    string = string.replace('z', '!!!!!');
  }
  var buffer = new Buffer(string, 'utf8'); // utf8 at all times?
  return decodeBuffer(buffer, encoding);
}

module.exports = {
  encode : function(data, encoding) {
    encoding = encoding || DEFAULT_ENCODING;
    if (-1 === [ 'ascii85', 'z85', 'ipv6' ].indexOf(encoding)) {
      return false;
    }

    if (data instanceof Buffer) {
      return ('ipv6' === encoding) ? encodeBufferIPv6(data) : encodeBuffer(data, encoding);
    }

    if (typeof data === 'string') {
      return ('ipv6' === encoding) ? encodeStringIPv6(data) : encodeString(data, encoding);
    }

    return false;
  },

  decode : function(data, encoding) {
    encoding = encoding || DEFAULT_ENCODING;
    if (-1 === [ 'ascii85', 'z85', 'ipv6' ].indexOf(encoding)) {
      return false;
    }

    if (data instanceof Buffer) {
      return ('ipv6' === encoding) ? decodeBufferIPv6(data) : decodeBuffer(data, encoding);
    }

    if (typeof data === 'string') {
      return ('ipv6' === encoding) ? decodeStringIPv6(data) : decodeString(data, encoding);
    }

    return false;
  }
};
