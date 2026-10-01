import { describe, expect, it } from 'vitest';
import base85 from '../lib/base85';

/* Two all-zero groups encode to two 'z' shorthands: <~zGR?=Ez~> */
const bytes = Buffer.from([0, 0, 0, 0, 1, 2, 3, 4, 0, 0, 0, 0]);

describe('ascii85 multiple zero groups', () => {
  it('decodes every z from a string', () => {
    const encoded = base85.encode(bytes, 'ascii85');
    expect(encoded.split('z').length - 1).toBe(2);
    expect(base85.decode(encoded, 'ascii85')).toEqual(bytes);
  });

  it('decodes every z from a buffer', () => {
    const encoded = Buffer.from(base85.encode(bytes, 'ascii85'));
    expect(base85.decode(encoded, 'ascii85')).toEqual(bytes);
  });
});
