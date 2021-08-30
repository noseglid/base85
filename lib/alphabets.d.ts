declare type Alphabet = {
  [key: number]: string;
}
declare type Tebahpla = {
  [key: string]: number;
}

export namespace ascii85 {
  const enc: Alphabet;
  const dec: Tebahpla;
}

export namespace z85 {
  const enc: Alphabet;
  const dec: Tebahpla;
}

export namespace ipv6 {
  const enc: Alphabet;
  const dec: Tebahpla;
}
