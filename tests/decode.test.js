import { describe, expect, it } from 'vitest';
import base85 from '../lib/base85';
import * as data from './data';
import alphabet from '../lib/alphabets';

describe('decode', () => {
  it('errors on invalid buffers', () => {
    expect(base85.decode(1234, 'ascii85')).toBe(false);
    expect(base85.decode('<~u~>', 'ascii85')).toBe(false);
    expect(base85.decode('<~uuuuu~>', 'ascii85')).toBe(false);
    expect(base85.decode('a')).toBe(false);
    expect(base85.decode('asdf')).toBe(false);
    expect(base85.decode('asdfgh')).toBe(false);
    expect(base85.decode('as fg')).toBe(false);
    expect(base85.decode('     ')).toBe(false);
    expect(base85.decode('      ')).toBe(false);
    expect(base85.decode('as\nfg')).toBe(false);
  });

  it.each(
    Object.keys(alphabet).flatMap((encoding) => {
      return data.data
        .filter((tc) => tc.enc[encoding] !== undefined)
        .map((tc) => [encoding, tc.enc[encoding], tc.raw]);
    }),
  )('decodes using %s #%#', (encoding, encoded, decoded) => {
    expect(base85.decode(encoded, encoding)).toEqual(decoded);
  });

  describe('handles whitespaces and correctly ignore them', () => {
    it.each([
      ['<~\n@p\ns7\ntD.3~>', 'ascii85', Buffer.from('canumb')],
      ['<~\n @  p \ns7 \n t D .3~>', 'ascii85', Buffer.from('canumb')],
      [
        '<~\n @  p \ns7 \n t D .3            ~>',
        'ascii85',
        Buffer.from('canumb'),
      ],
      ['<~@ps7tD.3        \n    ~>', 'ascii85', Buffer.from('canumb')],
      ['<~       @ps7tD.3     \n     ~>', 'ascii85', Buffer.from('canumb')],
    ])('decodes whitespaces #%#', (encoded, encoding, decoded) => {
      expect(base85.decode(encoded, encoding)).toEqual(decoded);
    });
  });
});
