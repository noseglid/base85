import type { Buffer } from 'buffer';

import _alphabets = require('./alphabets');

declare namespace base85 {
  type Base85Encoding = 'z85' | 'ascii85' | 'ipv6';
  type Codec = _alphabets.Codec;

  const alphabets: typeof _alphabets;

  function encode(data: Buffer | string, encoding?: Base85Encoding): string;
  function decode(
    data: Buffer | string,
    encoding?: Base85Encoding,
  ): Buffer | false;
}

export = base85;
