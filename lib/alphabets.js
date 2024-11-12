'use strict';

const _ = require('underscore');

const alphabet = {};

const _build = function(base) {
    var codec = {};
    codec.enc = Array.from(base);
    codec.dec = _.object(
        _.map(_.values(codec.enc), function(v) { /* The keys */
            return v.charCodeAt(0);
        }),
        _.map(_.keys(codec.enc), function(v) { /* The values */
            return parseInt(v);
        })
    );
    return codec;
};

alphabet.ascii85 = _build('!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu');
alphabet.btoa = _build('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~');
alphabet.z85 = _build('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#');

alphabet.z85pad = alphabet.z85;  // allow codec with length adaption
alphabet.a85 = alphabet.ascii85; // no <~ … ~> framing

alphabet.ipv6 = alphabet.btoa;  // what a coincidence *g*

module.exports = alphabet;
