var stream = require('stream');

var ENC_START = '<~';
var ENC_END   = '~>';

var NUM_MAXVALUE = Math.pow(2, 32) - 1;

function encode_buffer(buffer)
{
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
      block.unshift(String.fromCharCode(num % 85 + 33));
      num = Math.floor(num / 85);
    }

    /* And append them to the result */
    result += block.join('');
  }

  return ENC_START + result.substring(0, result.length - padding) + ENC_END;
}

function encode_string(string)
{
  var buffer = new Buffer(string, 'utf8'); // utf8 at all times?
  return encode_buffer(buffer);
}

function decode_buffer(buffer)
{
  if (buffer.length < 4) {
    return false;
  }

  var dataLength = buffer.length - ENC_START.length - ENC_END.length;
  var padding = (dataLength % 5 === 0) ? 0 : 5 - dataLength % 5;

  var bufferStart = ENC_START.length;
  var bufferEnd   = bufferStart + dataLength;

  var result = new Buffer(4 * Math.ceil((bufferEnd - bufferStart) / 5))

  var nextValidByte = function(index) {
    if (index < bufferEnd)
      while (-1 !== [0x0a, 0x20, 0x0d, 0x09, 0x0b, 0x0c].indexOf(buffer[index])) {
        padding = (padding + 1) % 5;
        index++; // skip newline character
      }
    return index;
  };

  var writeIndex = 0;
  for (var i = bufferStart; i < bufferEnd;) {
    var num = 0;

    i = nextValidByte(i);
    num = ((buffer[i] - 33) * 85 * 85 * 85 * 85);

    i = nextValidByte(i + 1);
    num += ((i >= bufferEnd ? 84 : (buffer[i] - 33)) * 85 * 85 * 85);

    i = nextValidByte(i + 1);
    num += ((i >= bufferEnd ? 84 : (buffer[i] - 33)) * 85 * 85);

    i = nextValidByte(i + 1);
    num += ((i >= bufferEnd ? 84 : (buffer[i] - 33)) * 85);

    i = nextValidByte(i + 1);
    num += ((i >= bufferEnd ? 84 : (buffer[i] - 33)));

    i = nextValidByte(i + 1);

    if (num > NUM_MAXVALUE || num < 0) {
      /* Bogus data */
      return false;
    }

    result.writeUInt32BE(num, writeIndex);
    writeIndex += 4;
  }

  return result.slice(0, writeIndex - padding);
}

function decode_string(string)
{
  var buffer = new Buffer(string, 'utf8'); // utf8 at all times?
  return decode_buffer(buffer);
}

module.exports = {
  encode : function(data) {
    if (data instanceof Buffer)
      return encode_buffer(data);

    if (typeof data === 'string')
      return encode_string(data);

    return false;
  },

  decode : function(data) {
    if (data instanceof Buffer)
      return decode_buffer(data);

    if (typeof data === 'string')
      return decode_string(data);

    return false;
  }
};
