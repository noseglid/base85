'use strict';

const alphabet = {};

const build = (base) => {
    var codec = {};
    codec.enc = Array.from(base);
    codec.dec = {};
    codec.enc.forEach((val, index) => { codec.dec[val.charCodeAt(0)] = index; });
    return codec;
};

alphabet.ascii85 = build('!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu');
alphabet.btoa = build('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~');
alphabet.z85 = build('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#');

alphabet.z85pad = alphabet.z85;  // allow codec with length adaption
alphabet.a85 = alphabet.ascii85; // no <~ … ~> framing

alphabet.ipv6 = alphabet.btoa;  // what a coincidence *g*

module.exports = alphabet;
