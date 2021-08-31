'use strict';

const base85 = require('../lib/base85');
const fs     = require('fs');

module.exports.ascii85 = function(test)
{
  const raw = Buffer.from(fs.readFileSync('./tests/loremipsum.raw'));
  const enc = Buffer.from(fs.readFileSync('./tests/loremipsum.base85'));

  const decoded = base85.decode(enc, 'ascii85');
  const encoded = base85.encode(raw, 'ascii85');

  test.deepEqual(decoded, raw);
  test.deepEqual(encoded, enc.toString('ascii'));
  test.done();
};

module.exports.z85 = function(test)
{
  const raw = Buffer.from(fs.readFileSync('./tests/loremipsum.raw'));
  const enc = Buffer.from(fs.readFileSync('./tests/loremipsum.z85'));

  const decoded = base85.decode(enc, 'z85');
  const encoded = base85.encode(raw, 'z85');

  test.deepEqual(decoded, raw);
  test.deepEqual(encoded, enc.toString('ascii'));
  test.done();
};
