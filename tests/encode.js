'use strict';

const _         = require('underscore');
const base85    = require('../lib/base85');
const data      = require('./data').data;
const alphabets = require('../lib/alphabets');

exports.testErrors = function(test)
{
  test.equal(base85.encode(1234, 'ascii85'), false);
  test.equal(base85.encode(Buffer.from([0x0, 0x0, 0x0])), false);
  test.equal(base85.encode(Buffer.from([0x0, 0x0, 0x0, 0x0, 0x0])), false);
  test.done();
};

exports.testBasic = function(test)
{
  test.expect(22);

  _.each(Object.keys(alphabets), function(encoding) {
    _.each(data, function (tc) {
      if (tc.enc[encoding]) {
        test.equal(base85.encode(tc.raw, encoding), tc.enc[encoding]);
      }
    });
  });

  test.done();
};
