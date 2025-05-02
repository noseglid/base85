import base85 from '../lib/base85';
import { describe, expect, it } from 'vitest';

describe('ipv6', () => {
  it.each([
    ['asdf'],
    ['0:0:0:0:0:0:0:0:0'] /* 9 groups */,
    [Buffer.alloc(17)] /* Oops. Too large */,
    [Buffer.alloc(15)] /* Oops. Too small */,
    [Buffer.alloc(20)] /* Oops. Too large */,
  ])('encode: error on invalid buffer: %s', (raw) => {
    expect(base85.encode(raw, 'ipv6')).toEqual(false);
  });

  it.each([
    ['asdf'],
    ['aaaaaaaaaaaaaaaaaaaaa'] /* 21 chars */,
    ['aaaaaaaaaaaaaaa'] /* 16 chars */,
    [Buffer.alloc(16)],
    [Buffer.alloc(19)],
    [Buffer.alloc(21)],
  ])('decode: error on invalid buffer: %s', (encoded) => {
    expect(base85.decode(encoded, 'ipv6')).toEqual(false);
  });

  it.each([
    ['1080:0:0:0:8:800:200c:417a', '4)+k&C#VzJ4br>0wv%Yp'],
    ['::1', '00000000000000000001'],
    ['ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '=r54lj&NUUO~Hi%c2ym0'],
    ['2001:0db8:0100:f101:0210:a4ff:fee3:9566', '9R}vSQZ1W=9A_Q74Lz&R'],
    ['2001:db8:100:f101::1', '9R}vSQZ1W=8fRv3*HAqn'],
    [
      Buffer.from([
        0x10, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x08, 0x08, 0x00,
        0x20, 0x0c, 0x41, 0x7a,
      ]),
      '4)+k&C#VzJ4br>0wv%Yp',
    ],
    [
      Buffer.from([
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
        0xff, 0xff, 0xff, 0xff,
      ]),
      '=r54lj&NUUO~Hi%c2ym0',
    ],
  ])('encode #%# ', (raw, encoded) => {
    expect(base85.encode(raw, 'ipv6')).toEqual(encoded);
  });

  it.each([
    ['4)+k&C#VzJ4br>0wv%Yp', '1080::8:800:200c:417a'],
    ['=r54lj&NUUO~Hi%c2ym0', 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'],
    ['00000000000000000001', '::1'],
    ['9R}vSQZ1W=8fRv3*HAqn', '2001:db8:100:f101::1'],
    [Buffer.from('4)+k&C#VzJ4br>0wv%Yp'), '1080::8:800:200c:417a'],
  ])('decode #%#', (encoded, raw) => {
    expect(base85.decode(encoded, 'ipv6')).toEqual(raw);
  });
});
