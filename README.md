base85
======

Simple utility to manage base85. Where [base64 adds approximately 1/3][Base64],
[base85 only adds about 1/4][Base85]

Installation
============

    npm install base85


Usage
=====

    var base85 = require('base85');
    console.log(base85.encode('Hello, world!'));

Outputs: `<~87cURD_*#TDfTZ)+T~>`

[Base64]: http://en.wikipedia.org/wiki/Base64
[Base85]: http://en.wikipedia.org/wiki/Ascii85
