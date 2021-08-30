'use strict';

const base85 = require('../lib/base85');

exports.testErrors = function(test)
{
  test.equal(base85.encode('asdf', 'ipv6'), false);
  test.equal(base85.encode('0:0:0:0:0:0:0:0:0', 'ipv6'), false); /* 9 groups */
  test.equal(base85.encode(Buffer.alloc(17), 'ipv6'), false); /* Oops. Too large */
  test.equal(base85.encode(Buffer.alloc(15), 'ipv6'), false); /* Oops. Too small */
  test.equal(base85.encode(Buffer.alloc(20), 'ipv6'), false); /* Oops. Too large */

  test.equal(base85.decode('asdf', 'ipv6'), false);
  test.equal(base85.decode('aaaaaaaaaaaaaaaaaaaaa', 'ipv6'), false); /* 21 chars */
  test.equal(base85.decode('aaaaaaaaaaaaaaa', 'ipv6'), false); /* 16 chars */
  test.equal(base85.decode(Buffer.alloc(16), 'ipv6'), false);
  test.equal(base85.decode(Buffer.alloc(19), 'ipv6'), false);
  test.equal(base85.decode(Buffer.alloc(21), 'ipv6'), false);

  test.done();
};

exports.testBasicEncodeString = function(test)
{
  test.equal(base85.encode('1080:0:0:0:8:800:200c:417a', 'ipv6'), '4)+k&C#VzJ4br>0wv%Yp');
  test.equal(base85.encode('::1', 'ipv6'), '00000000000000000001');
  test.equal(base85.encode('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', 'ipv6'), '=r54lj&NUUO~Hi%c2ym0');
  test.equal(base85.encode('2001:0db8:0100:f101:0210:a4ff:fee3:9566', 'ipv6'), '9R}vSQZ1W=9A_Q74Lz&R');
  test.equal(base85.encode('2001:db8:100:f101::1', 'ipv6'), '9R}vSQZ1W=8fRv3*HAqn');
  test.done();
};

exports.testBasicEncodeBuffer = function(test)
{
  const b1 = Buffer.from([
    0x10, 0x80, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x08, 0x08, 0x00,
    0x20, 0x0C, 0x41, 0x7A
  ]);
  test.equal(base85.encode(b1, 'ipv6'), '4)+k&C#VzJ4br>0wv%Yp');

  const b2 = Buffer.from([
    0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF
  ]);
  test.equal(base85.encode(b2, 'ipv6'), '=r54lj&NUUO~Hi%c2ym0');

  test.done();
};

exports.testBasicDecodeString = function(test)
{
  test.equal(base85.decode('4)+k&C#VzJ4br>0wv%Yp', 'ipv6'), '1080::8:800:200c:417a');
  test.equal(base85.decode('=r54lj&NUUO~Hi%c2ym0', 'ipv6'), 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff');
  test.equal(base85.decode('00000000000000000001', 'ipv6'), '::1');
  test.equal(base85.decode('9R}vSQZ1W=8fRv3*HAqn', 'ipv6'), '2001:db8:100:f101::1');
  test.done();
};

exports.testBasicDecodeBuffer = function(test)
{
  test.equal(base85.decode(Buffer.from('4)+k&C#VzJ4br>0wv%Yp'), 'ipv6'), '1080::8:800:200c:417a');
  test.done();
};
