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
  var dataLength = buffer.length - ENC_START.length - ENC_END.length;
  var padding = (dataLength % 5 === 0) ? 0 : 5 - dataLength % 5;

  var bufferStart = ENC_START.length;
  var bufferEnd   = bufferStart + dataLength;

  var result = new Buffer(4 * Math.ceil((bufferEnd - bufferStart) / 5))

  for (var i = bufferStart; i < bufferEnd; i += 5) {
    var num = ((buffer[i] - 33) * 85 * 85 * 85 * 85) +
      ((i + 1 >= bufferEnd ? 84 : (buffer[i + 1] - 33)) * 85 * 85 * 85) +
      ((i + 2 >= bufferEnd ? 84 : (buffer[i + 2] - 33)) * 85 * 85) +
      ((i + 3 >= bufferEnd ? 84 : (buffer[i + 3] - 33)) * 85) +
      ((i + 4 >= bufferEnd ? 84 : (buffer[i + 4] - 33)));

    if (num > NUM_MAXVALUE) {
      /* Bogus data, no encoding can have a value larger than NUM_MAXVALUE */
      return false;
    }

    result.writeUInt32BE(num, 4 * Math.ceil((i - bufferStart) / 5));
  }

  return result.slice(0, result.length - padding);
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
