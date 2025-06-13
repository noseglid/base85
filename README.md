[![Build Status](https://travis-ci.org/noseglid/base85.png?branch=master)](https://travis-ci.org/noseglid/base85)

# base85

Base85 encoder/decoder written in native javascript.

Where base64 [adds approximately 1/3][Base64], base85 only [adds about
1/4][Base85]. Of course there's a tradeoff. The Base85 alphabet includes
characters that might not be as friendly as the base64 alphabet.  While it's
still only printable characters, the [Ascii85][Base85] specification contains
quotes (`'` and `"`) which needs escaping in many programming languages, and
the [ZeroMQ][Base85ZeroMQ] specification contains `<` and `>` which need
escaping in most (all?) [SGML][SGML] languages.

IPv6 encoding should only be used for encoding IPv6 addresses. When using IPv6,
input for encoding must always be 16 bytes, and input for decoding must always be 20 bytes.

ZeroMQ's version (`z85`) require [according to the specification][Base85ZeroMQ])
string input to be divisible by 5, and binary input to be divisible by 4.
This module includes a `z85pad` version which uses the same alphabet but
does not enforce, or indeed require, this restriction.

The `Ascii85` encoding frames the base85 string between `<~` and `~>`.
Use the alternate `a85` version if you don't want that.

Supported encoding specifications

  * [Ascii85][Base85]
  * [btoa][Base85]
  * [ZeroMQ][Base85ZeroMQ]
  * [IPv6][Base85IPv6]

## Installation

    npm install base85


## Usage

### Encoding:

    var base85 = require('base85');

    var z85 = base85.encode('Hello, world!!!!');
    console.log(z85); // nm=QNz.92Pz/PV8aT50L

### Decoding:

    var base85 = require('base85');

    var decoded = base85.decode('vqG:5Cw?IqayPd#az#9uAbn%daz>L5wPF#evpK6}vix96y?$k6z*rGH');
    console.log(decoded.toString('utf8')); // all work and no play makes jack a dull boy!!

### IPv6 ([RFC1924][Base85IPv6]), can take [any correctly formatted IPv6 address](http://en.wikipedia.org/wiki/IPv6):

    var base85 = require('base85');

    var ipv6 = base85.encode('2001:db8:100:f101::1', 'ipv6');
    console.log(ipv6); // 9R}vSQZ1W=8fRv3*HAqn

    var decoded = base85.decode('9R}vSQZ1W=8fRv3*HAqn', 'ipv6');
    console.log(decoded); // 2001:db8:100:f101::1

## API

### `encode(data [, encoding])`

> Encodes the specified data. If encoding is `ascii85`, the encoded data will be prepended
> with `<~` and appended with  `~>`.
>
> **data**
>> The data to encode, may be a `String` or a [Buffer][NodeBuffer].
>
> **encoding**
>> Which specification to use when encoding `data`. Valid values are:
>> `ascii85`, `z85`, `z85pad` or `ipv6`. Default is `z85`.
>>
>> For `ipv6`, if `data` is a buffer, it is expected to be the binary representation
>> of an IPv6 address (16 bytes). It **cannot** be a textual representation. If it is a string,
>> it can be on any valid IPv6 form (e.g. `::1` or `1080:0:0:0:8:800:200c:417a`,
>> parsing is done using [ip-address][IPAddress]).
>
> **returns**
>> A `String` with the encoded data.

### `decode(data [, encoding])`

> Decodes the specified data. If encoding is `ascii85`, the data is expected
> to start with `<~` and and end with `~>`. No checks are actually made for
> this, but output will be unexpected if this is not the case. If encoding is
> `ipv6`, the length of data must be exactly 20 bytes. `ipv6` encoding cannot
> be used with arbitrary data.
>
> A buffer is always returned as data may not be representable in a string.
> If you know it is, you can easily convert it to a string using the
> [Buffer.toString()][NodeBufferToString] utility.
>
> **data**
>> The data to decode. May be a `String` or a [Buffer][NodeBuffer].
>> If `ascii85`, it is expected to be enclosed in `<~` and `~>`.
>
> **encoding**
>> Which specification `data` is encoded with. Valid values are:
>> `ascii85`, `z85` or `ipv6`. Default is `z85`.
>
> **returns**
>> A [Buffer][NodeBuffer] With the decoded data, or **boolean** `false`
>> if the buffer could not be decoded. When testing if the result succeeded,
>> [always use operators with 3 characters][JSCompare] ('===' or '!==').
>

## Which specification to use?

ZeroMQ appears to be a better specification for most applications. It doesn't
include quotes in its alphabet which makes it useful in many quoted languages
(such as C, C++, JavaScript, Java, Python, Perl, Ruby... the list goes on).
Neither does it add the 4 extra enclosing bytes Ascii85 does.  There may,
however, be some problems using it in SGML and its derivatives since
both less-than `<` and greater-than `>` are part of the alphabet. But
then again, Ascii85 has that as well.

Ascii85 appears to be the most used of the base85 specifications however. As for why
completely eludes me. This may very well be the only reason to pick Ascii85.

If you control both decoding and encoding side, use ZeroMQ, or the `z85pad` version
if your buffers may not be a multiple of 4 bytes long.

If you need interoperability with Ascii85, use that.

As IPv6 encoding only supports exactly 128 bits (16 bytes), this is not very useful for
arbitrary data. Only use IPv6 if you're actually encoding IPv6 addresses.
(Also note the issuance date of RFC 1924.)

## Bugs

[IPv6 encoding specification (RFC1924)][Base85IPv6] requires 128-bit arithmetic,
which is rather problematic. I'm thrilled to see that the author of the RFC took this
in consideration, specifically - quote from the [RFC][Base85IPv6]: "This is not
considered a serious drawback in the representation, but a flaw of the processor designs."
Silly processor designers. Currently, this is implemented using an arbitrary precision algorithm,
it's slow but it does the job. Now let's poke those processor designers for 128-bit processors.

[Base64]: http://en.wikipedia.org/wiki/Base64
[Base85]: http://en.wikipedia.org/wiki/Ascii85
[NodeBuffer]: http://nodejs.org/api/buffer.html
[NodeBufferToString]: http://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end
[Base85ZeroMQ]: http://rfc.zeromq.org/spec:32
[Base85IPv6]: http://tools.ietf.org/html/rfc1924
[JSCompare]: http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
[SGML]: https://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language
[IPAddress]: https://www.npmjs.com/package/ip-address
