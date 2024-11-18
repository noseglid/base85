'use strict';

const base85    = require('../lib/base85');
const data      = require('./data').data;
const alphabets = require('../lib/alphabets');

exports.testErrors = function(test)
{
  test.equal(base85.decode(1234, 'ascii85'), false);
  test.equal(base85.decode('<~u~>', 'ascii85'), false);
  test.equal(base85.decode('<~uuuuu~>', 'ascii85'), false);
  test.equal(base85.decode('a'), false);
  test.equal(base85.decode('asdf'), false);
  test.equal(base85.decode('asdfgh'), false);
  test.equal(base85.decode('as fg'), false);
  test.equal(base85.decode('     '), false);
  test.equal(base85.decode('      '), false);
  test.equal(base85.decode('as\nfg'), false);
  test.done();
};

exports.testBasic = function(test)
{
  test.expect(44);

  for (const encoding of Object.keys(alphabets)) {
    for (const tc of data) {
      if (tc.enc[encoding]) {
        const exp = typeof tc.raw === 'string' ? Buffer.from(tc.raw) : tc.raw;
        test.deepEqual(base85.decode(tc.enc[encoding], encoding), exp);
      }
    }
  }

  test.done();
};

exports.testWhiteSpace = function(test)
{
  test.deepEqual(base85.decode('<~\n@p\ns7\ntD.3~>', 'ascii85'), Buffer.from('canumb'));
  test.deepEqual(base85.decode('<~\n @  p \ns7 \n t D .3~>', 'ascii85'), Buffer.from('canumb'));
  test.deepEqual(base85.decode('<~\n @  p \ns7 \n t D .3            ~>', 'ascii85'), Buffer.from('canumb'));
  test.deepEqual(base85.decode('<~@ps7tD.3        \n    ~>', 'ascii85'), Buffer.from('canumb'));
  test.deepEqual(base85.decode('<~       @ps7tD.3     \n     ~>', 'ascii85'), Buffer.from('canumb'));

  test.done();
};
