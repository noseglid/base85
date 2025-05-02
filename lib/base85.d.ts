import type { Buffer } from 'buffer';

declare type Base85Encoding = 'z85' | 'ascii85' | 'ipv6';

export function encode(
  data: Buffer | string,
  encoding?: Base85Encoding,
): string;
export function decode(
  data: Buffer | string,
  encoding?: Base85Encoding,
): Buffer | false;
