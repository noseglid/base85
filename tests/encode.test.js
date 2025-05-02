import { describe, expect, it } from 'vitest';
import base85 from '../lib/base85';
import * as data from './data';
import alphabet from '../lib/alphabets';

describe('encode', () => {
  it('errors on invalid buffers', () => {
    expect(base85.encode(1234, 'ascii85')).toEqual(false);
    expect(base85.encode(Buffer.from([0x0, 0x0, 0x0]))).toEqual(false);
    expect(base85.encode(Buffer.from([0x0, 0x0, 0x0, 0x0, 0x0]))).toEqual(
      false,
    );
  });

  it.each(
    Object.keys(alphabet).flatMap((encoding) => {
      return data.data
        .filter((tc) => tc.enc[encoding] !== undefined)
        .map((tc) => [encoding, tc.enc[encoding], tc.raw]);
    }),
  )('encodesusing %s #%#', (encoding, encoded, decoded) => {
    expect(base85.encode(decoded, encoding)).toEqual(encoded);
  });
});
