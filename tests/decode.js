var _      = require('underscore');
var base85 = require('../lib/base85');
var data   = require('./data');

exports.testErrors = function(test)
{
  test.equal(base85.decode(1234), false)
  test.done();
}

exports.testBasic = function(test)
{
  test.expect(data.length);

  _.each(data, function (tc) {
    test.deepEqual(base85.decode(tc.enc), tc.raw);
  });

  test.done();
}
