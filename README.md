[![Build Status](https://travis-ci.org/noseglid/base85.png?branch=master)](https://travis-ci.org/noseglid/base85)

# base85

Simple utility to manage base85. Where [base64 adds approximately 1/3][Base64],
[base85 only adds about 1/4][Base85]. Of course there's a tradeoff. The Base85
alphabet includes characters that might not be as friendly as the base64 alphabet.
While it's still only printable characters (ASCII 33 '!' to ASCII 117 'u'), it contains
quotes, both ' and " and other characters which might appear problematic in some
applications.

## Installation

    npm install base85


## Usage

For encoding:

    var base85 = require('base85');
    console.log(base85.encode('Hello, world!'));

Output: `<~87cURD_*#TDfTZ)+T~>`

For decoding:

    var base85 = require('base85');
    var decoded = base85.decode('<~@;Ka&GAhM;+CT.u+Du*?E,8s.+DkP&ATJu/@:O\'q@3B*\'Cht5\'Dg;~>');
    console.log(decoded.toString('ascii'));

Output: `all work and no play makes jack a dull boy`

## Bugs

Doesn't support the z-abbreviation as for now.

## API

### `encode(data)`

> _Encodes the specified data. The encoded data will be prepended
> with `<~` and appended with  `~>`. This is actually following Adobes version
> which seems to be the common practice for base85._
>
> **data** The data to encode, may be a `String` or a [Buffer][NodeBuffer].
>
> **returns** A `String` with the encoded data.

### `decode(data)`

> _Decodes the specified data. The data is expected to start with `<~` and
> and end with `~>`. No checks are actually made for this, but output will
> be unexpected if this is not the case._
>
> _A buffer is always returned as data may not be representable in a string.
> If you know it is, you can easily convert it to a string using the
> [Buffer.toString()][NodeBufferToString] utility._
>
> **data** The data to decode. May be a `String` or a [Buffer][NodeBuffer].
> Expected to be enclosed in `<~` and `~>`.
>
> **returns** A [Buffer][NodeBuffer]
>

[Base64]: http://en.wikipedia.org/wiki/Base64
[Base85]: http://en.wikipedia.org/wiki/Ascii85
[NodeBuffer]: http://nodejs.org/api/buffer.html
[NodeBufferToString]: http://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end

