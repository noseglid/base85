import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import base85 from '../lib/base85';

describe('loremipsum', () => {
  it('encodes/decodes loremipsum using ascii85', () => {
    const raw = Buffer.from(fs.readFileSync('./tests/loremipsum.raw'));
    const enc = Buffer.from(fs.readFileSync('./tests/loremipsum.base85'));

    const decoded = base85.decode(enc, 'ascii85');
    const encoded = base85.encode(raw, 'ascii85');

    expect(decoded).toEqual(raw);
    expect(encoded).toEqual(enc.toString('ascii'));
  });

  it('encodes/decodes loremipsum using z85', () => {
    const raw = Buffer.from(fs.readFileSync('./tests/loremipsum.raw'));
    const enc = Buffer.from(fs.readFileSync('./tests/loremipsum.z85'));

    const decoded = base85.decode(enc, 'z85');
    const encoded = base85.encode(raw, 'z85');

    expect(decoded).toEqual(raw);
    expect(encoded).toEqual(enc.toString('ascii'));
  });
});
