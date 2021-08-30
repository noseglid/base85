'use strict';

const { Buffer } = require('buffer');
const alphabets = require('./alphabets');
const Address6 = require('ip-address').Address6;

const NUM_MAXVALUE = Math.pow(2, 32) - 1;
const QUAD85 = 85 * 85 * 85 * 85;
const TRIO85 = 85 * 85 * 85;
const DUO85  = 85 * 85;
const SING85 = 85;

const DEFAULT_ENCODING = 'z85';

const BigInt = typeof(window) !== 'undefined' ? window.BigInt : global.BigInt;

/* Characters to allow (and ignore) in an encoded buffer */
const IGNORE_CHARS = [
  0x09, /* horizontal tab */
  0x0a, /* line feed, new line */
  0x0b, /* vertical tab */
  0x0c, /* form feed, new page */
  0x0d, /* carriage return */
  0x20  /* space */
];

const ASCII85_ENC_START = '<~';
const ASCII85_ENC_END   = '~>';

function bufferToBigInt(buffer) {
  return BigInt('0x'+Buffer.from(buffer).toString('hex'));
}

/* Function borrowed from noseglid/canumb (github) */
function pad(width, number)
{
  return new Array(1 + width - number.length).join('0') + number;
}

function encodeBignumIPv6(num)
{
  const enctable = alphabets.ipv6.enc;

  const enc = [];
  for (let i = 1; i < 20; ++i) {
    enc.push(enctable[Number(num % 85n)]); /* Ranges between 0 - 84 */
    num = num / 85n;
  }
  enc.push(enctable[Number(num)]); /* What's left is also in range 0 - 84 */
  return enc.reverse().join('');
}


function encodeBufferIPv6(buffer)
{
  if (16 !== buffer.length) {
    /* An IPv6 address must be exactly 16 bytes, 128 bits long */
    return false;
  }

  return encodeBignumIPv6(bufferToBigInt(buffer));
}

function encodeStringIPv6(string)
{
  const addr = new Address6(string);
  if (!addr.isValid()) {
    return false;
  }

  const hex = addr.parsedAddress.map(function(el) {
    return pad(4, el);
  }).join('');
  const num = BigInt(`0x${hex}`);

  return encodeBignumIPv6(num);
}

function decodeStringIPv6(string)
{
  if (20 !== string.length) {
    /* An encoded IPv6 is always (5/4) * 16 = 20 bytes */
    return false;
  }

  const dectable = alphabets.ipv6.dec;
  let i = 0;

  /* bignum throws an exception if invalid data is passed */
  try {
    const binary = string.split('').reduceRight(function(memo, el) {
      const num = BigInt(dectable[el.charCodeAt(0)]);
      const fact = BigInt(85) ** BigInt(i++);
      const contrib = num * fact;
      return memo + (contrib);
    }, BigInt(0));

    return Address6.fromBigInteger(binary).correctForm();
  } catch(e) {
    return false;
  }
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
  const enctable = alphabets[encoding].enc;
  const padding = (buffer.length % 4 === 0) ? 0 : 4 - buffer.length % 4;

  let result = '';
  for (let i = 0; i < buffer.length; i += 4) {

    /* 32 bit number of the current 4 bytes (padded with 0 as necessary) */
    let num = ((buffer[i] << 24) >>> 0) + // Shift right to force unsigned number
        (((i + 1 > buffer.length ? 0 : buffer[i + 1]) << 16) >>> 0) +
        (((i + 2 > buffer.length ? 0 : buffer[i + 2]) <<  8) >>> 0) +
        (((i + 3 > buffer.length ? 0 : buffer[i + 3]) <<  0) >>> 0);

    /* Create 5 characters from '!' to 'u' alphabet */
    let block = [];
    for (let j = 0; j < 5; ++j) {
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
  const buffer = Buffer.from(string, 'utf8'); // utf8 at all times?
  return encodeBuffer(buffer, encoding);
}

function decodeBuffer(buffer, encoding)
{
  const dectable = alphabets[encoding].dec;

  let dataLength = buffer.length;
  if ('ascii85' === encoding) {
    dataLength -= (ASCII85_ENC_START.length + ASCII85_ENC_END.length);
  }

  if ('z85' === encoding && dataLength % 5 !== 0) {
    return false;
  }

  let padding = (dataLength % 5 === 0) ? 0 : 5 - dataLength % 5;

  const bufferStart = ('ascii85' === encoding) ? ASCII85_ENC_START.length : 0;
  const bufferEnd   = bufferStart + dataLength;

  const result = Buffer.alloc(4 * Math.ceil((bufferEnd - bufferStart) / 5));

  const nextValidByte = function(index) {
    if (index < bufferEnd) {
      while (-1 !== IGNORE_CHARS.indexOf(buffer[index])) {
        padding = (padding + 1) % 5;
        index++; // skip newline character
      }
    }
    return index;
  };

  let writeIndex = 0;
  for (let i = bufferStart; i < bufferEnd;) {
    let num = 0;
    const starti = i;

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
  let buffer = Buffer.from(string, 'utf8'); // utf8 at all times?
  return decodeBuffer(buffer, encoding);
}

function encode(data, encoding) {
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
}

function decode(data, encoding) {
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

module.exports = {
  encode,
  decode
};
