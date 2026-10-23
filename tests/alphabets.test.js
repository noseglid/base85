import { describe, expect, it } from 'vitest';
import base85 from '../lib/base85';

describe('alphabets', () => {
  it('can not be extended at runtime', () => {
    expect(Object.isFrozen(base85.alphabets)).toEqual(true);
    expect(() => {
      base85.alphabets.custom = base85.alphabets.z85;
    }).toThrow(TypeError);
    expect(Object.hasOwn(base85.alphabets, 'custom')).toEqual(false);
    expect(base85.encode('abcd', 'custom')).toEqual(false);
    expect(base85.decode('w]zP%', 'custom')).toEqual(false);
  });

  it('can not be replaced at runtime', () => {
    const z85 = base85.alphabets.z85;
    expect(() => {
      base85.alphabets.z85 = base85.alphabets.btoa;
    }).toThrow(TypeError);
    expect(base85.alphabets.z85).toBe(z85);
  });
});
