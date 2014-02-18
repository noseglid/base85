var _      = require('underscore');
var base85 = require('../lib/base85');
var data   = require('./data').data;

exports.testErrors = function(test)
{
  test.equal(base85.encode(1234), false);
  test.done();
}

exports.testBasic = function(test)
{
  test.expect(data.length);

  _.each(data, function (tc) {
    test.equal(base85.encode(tc.raw), tc.enc);
  });

  test.done();
}
