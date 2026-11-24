declare namespace alphabets {
  interface Codec {
    /** All characters of the alphabet, in encoding order */
    chars: string;
    /** Value -> character */
    enc: readonly string[];
    /** Character code -> value */
    dec: Readonly<Record<number, number>>;
  }
}

declare const alphabets: Readonly<{
  ascii85: alphabets.Codec;
  a85: alphabets.Codec;
  btoa: alphabets.Codec;
  z85: alphabets.Codec;
  z85pad: alphabets.Codec;
  ipv6: alphabets.Codec;
}>;

export = alphabets;
