[![Build Status](https://travis-ci.org/noseglid/base85.png?branch=master)](https://travis-ci.org/noseglid/base85)

# base85

Simple utility to manage base85. Where [base64 adds approximately 1/3][Base64],
[base85 only adds about 1/4][Base85]. Of course there's a tradeoff. The Base85
alphabet includes characters that might not be as friendly as the base64 alphabet.
While it's still only printable characters, the [Ascii85][Base85] specification contains
quotes (`'` and `"`) which needs escaping in many programming languages,
and the [ZeroMQ][Base85ZeroMQ] specification contains `<` and `>` which need escaping
in most (all?) [SGML][SGML] languages.

Supported encoding specifications

  * [Ascii85][Base85]
  * [ZeroMQ][Base85ZeroMQ]

## Installation

    npm install base85


## Usage

For encoding:

    var base85 = require('base85');
    console.log(base85.encode('Hello, world!')); // 'nm=QNz.92Pz/PV8aP'
    console.log(base85.encode('Hello, world!', 'ascii85')); // ' <~87cURD_*#TDfTZ)+T~>'

For decoding:

    var base85 = require('base85');
    var decoded = base85.decode('vqG:5Cw?IqayPd#az#9uAbn%daz>L5wPF#evpK6}vix96y?$k6z*q');
    console.log(decoded.toString('utf8')); // 'all work and no play makes jack a dull boy'

## Bugs

Doesn't support the z-abbreviation for [Ascii85][Base85]. This means that data encoded with this
support will cause the library to return false. An all-zero input buffer will be encoded
as `<~!!!!!~>`, rather than `<~z~>`

Doesn't support [IPv6 encoding specification (RFC1924)][Base85IPv6] for now. This baby requires
requires 128-bit arithmetic, which is rather problematic. I'm thrilled to see that the author
of the RFC took this in consideration, specifically - quote from the [RFC][Base85IPv6]: "This is not
considered a serious drawback in the representation, but a flaw of the processor designs."
Silly processor designers.

## API

### `encode(data[, encoding])`

> _Encodes the specified data. If encoding is `ascii85`, the encoded data will be prepended
> with `<~` and appended with  `~>`._
>
> **data** The data to encode, may be a `String` or a [Buffer][NodeBuffer].
>
> **encoding** Which specification to use when encoding `data`.  May be either
>              `ascii85` ([Adobe][Base85]) or `z85` ([ZeroMQ][Base85ZeroMQ]).
>              Default is `z85`.
>
> **returns** A `String` with the encoded data.

### `decode(data[, encoding])`

> _Decodes the specified data. If encoding is `ascii85`, the data is expected
> to start with `<~` and and end with `~>`. No checks are actually made for
> this, but output will be unexpected if this is not the case._
>
> _A buffer is always returned as data may not be representable in a string.
> If you know it is, you can easily convert it to a string using the
> [Buffer.toString()][NodeBufferToString] utility._
>
> **data** The data to decode. May be a `String` or a [Buffer][NodeBuffer].
> Expected to be enclosed in `<~` and `~>`.
>
> **encoding** Which specification `data` is encoded with. May be either
>              `ascii85` ([Adobe][Base85]) or `z85` ([ZeroMQ][Base85ZeroMQ]).
>              Default is `z85`.
>
> **returns** A [Buffer][NodeBuffer] With the decoded data, or **boolean** `false` if the buffer could not be decoded. When testing if the result succeeded, [always use operators with 3 characters][JSCompare] ('===' or '!===').
>

[Base64]: http://en.wikipedia.org/wiki/Base64
[Base85]: http://en.wikipedia.org/wiki/Ascii85
[NodeBuffer]: http://nodejs.org/api/buffer.html
[NodeBufferToString]: http://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end
[Base85ZeroMQ]: http://rfc.zeromq.org/spec:32
[Base85IPv6]: http://tools.ietf.org/html/rfc1924
[JSCompare]: http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
[SGML]: https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language
