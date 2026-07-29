import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import base85 from '../lib/base85';
import * as data from './data';
import alphabet from '../lib/alphabets';

const json = fs.readFileSync("tests/fixtures/utf8.json");

describe('utf8 encoding', () => {
  it('encodes json', () => {
    const jsonBase85 = base85.encode(json, 'ascii85');
    const jsonDecoded = base85.decode(jsonBase85, 'ascii85');

    expect(jsonDecoded).not.toBe(false);
    expect(jsonDecoded.length).toBe(json.length);
    expect(jsonDecoded).toEqual(json);
  });
});
