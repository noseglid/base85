'use strict';

var base85 = require('../lib/base85');
var fs     = require('fs');

module.exports.ascii85 = function(test)
{
  var raw = new Buffer(fs.readFileSync('./tests/loremipsum.raw'));
  var enc = new Buffer(fs.readFileSync('./tests/loremipsum.base85'));

  var decoded = base85.decode(enc, 'ascii85');
  var encoded = base85.encode(raw, 'ascii85');

  test.deepEqual(decoded, raw);
  test.deepEqual(encoded, enc.toString('ascii'));
  test.done();
};

module.exports.z85 = function(test)
{
  var raw = new Buffer(fs.readFileSync('./tests/loremipsum.raw'));
  var enc = new Buffer(fs.readFileSync('./tests/loremipsum.z85'));

  var decoded = base85.decode(enc, 'z85');
  var encoded = base85.encode(raw, 'z85');

  test.deepEqual(decoded, raw);
  test.deepEqual(encoded, enc.toString('ascii'));
  test.done();
};
