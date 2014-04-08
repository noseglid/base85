'use strict';

var _      = require('underscore');
var base85 = require('../lib/base85');
var data   = require('./data').data;

exports.testErrors = function(test)
{
  test.equal(base85.encode(1234, 'ascii85'), false);
  test.done();
};

exports.testBasic = function(test)
{
  var encodings = [ 'ascii85', 'z85' ];
  test.expect(data.length * encodings.length);

  _.each(encodings, function(encoding) {
    _.each(data, function (tc) {
      test.equal(base85.encode(tc.raw, encoding), tc.enc[encoding]);
    });
  });

  test.done();
};
