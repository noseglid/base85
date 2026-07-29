import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import base85 from '../lib/base85';
import * as data from './data';
import alphabet from '../lib/alphabets';

const pdfDocument = fs.readFileSync("tests/fixtures/document.pdf");
const pngImage = fs.readFileSync("tests/fixtures/image.png");

describe('encode', () => {
  it('encodes pdf document', () => {
    const pdfDocumentBase85 = base85.encode(pdfDocument, 'ascii85');
    const pdfDocumentDecoded = base85.decode(pdfDocumentBase85, 'ascii85');

    expect(pdfDocumentDecoded).not.toBe(false);
    expect(pdfDocumentDecoded.length).toBe(pdfDocument.length);
    expect(pdfDocumentDecoded).toEqual(pdfDocument);
  });

  it('encodes png image', () => {
    const pngImageBase85 = base85.encode(pngImage, 'ascii85');
    const pngImageDecoded = base85.decode(pngImageBase85, 'ascii85');

    expect(pngImageDecoded).not.toBe(false);
    expect(pngImageDecoded.length).toBe(pngImage.length);
    expect(pngImageDecoded).toEqual(pngImage);
  });
});
