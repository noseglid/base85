export interface Codec {
  /** All characters of the alphabet, in encoding order */
  chars: string;
  /** Value -> character */
  enc: readonly string[];
  /** Character code -> value */
  dec: Readonly<Record<number, number>>;
}

declare const alphabets: Readonly<{
  ascii85: Codec;
  a85: Codec;
  btoa: Codec;
  z85: Codec;
  z85pad: Codec;
  ipv6: Codec;
}>;

export default alphabets;
