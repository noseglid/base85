const alphabet = {};

const build = (chars) => {
  const codec = {};
  codec.chars = chars;
  codec.enc = Array.from(chars);
  codec.dec = {};
  codec.enc.forEach((val, index) => {
    codec.dec[val.charCodeAt(0)] = index;
  });
  return codec;
};

alphabet.ascii85 = build(
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu',
);
alphabet.btoa = build(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~',
);
alphabet.z85 = build(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#',
);

alphabet.z85pad = alphabet.z85; // allow codec with length adaption
alphabet.a85 = alphabet.ascii85; // no <~ … ~> framing

alphabet.ipv6 = alphabet.btoa; // what a coincidence *g*

export default alphabet;
