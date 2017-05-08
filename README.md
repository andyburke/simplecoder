simplecoder
=========

simplecoder allows you to encode data using human-friendly dictionaries.

Think of it like base64, but instead of characters, you can use dictionaries
comprised of simple words (the default dictionary is a curated set of some of
the most common, easily distinguishable 4-letter words in English).

If you are capable of producing additional dictionaries, especially in other
languages, please consider submitting a pull request, it would gladly be
accepted.

## Examples

You could encode a UUID using the default 4-letter word English dictionary:

```
c27c98fa-32fc-406e-a7ddebce44fe9e77

such mean pull wood
ever work flow like
rule trip wave that
free year rest main
```

Now, that's obviously longer than the UUID in string form, but imagine one of your
customers trying to read you the UUID string over the phone, whereas this word-based
encoding would be fairly easy.

Even a SHA256 isn't terrible:

```
2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90

down tone band tall miss boat able ship
case cook suit ever page rule just salt
deal post cost talk town page seed hand
pick ship long town card lift like pair
```

The encoded version of the SHA256 might actually be easily verified by a human,
whereas comparing two strings of base64 is much more error-prone.

## Installation

```
npm install simplecoder
```

## Usage

```javascript
const uuid = require( 'uuid' );
const simplecoder = require( 'simplecoder' );

// create a uuid in a buffer (avoid encoding as hex and doubling size)
const my_uuid = uuid.v4( null, Buffer.alloc( 16 ) );
const encoded = simplecoder.encode( guid );

// ->
// [ 'such', 'mean', 'pull', 'wood',
//   'ever', 'work', 'flow', 'like',
//   'rule', 'trip', 'wave', 'that',
//   'free', 'year', 'rest', 'main' ]

const decoded = simplecoder.decode( encoded );

// ->
// <Buffer c2 7c 98 fa 32 fc 40 6e a7 dd eb ce 44 fe 9e 77>

decoded.toString( 'hex' );

// ->
// 'c27c98fa32fc406ea7ddebce44fe9e77'

```

### API

- encode( buffer | array | string[, dictionary ] ) : array

Takes the given buffer, array or string and returns an encoded array from the
given dictionary. If no dictionary is specified, simplecoder will use the
default simple 4-letter word English dictionary.

Example:

```javascript
simplecoder.encode( uuid.v4( null, Buffer.alloc( 16 ) ) );

// ->
// [ 'such', 'mean', 'pull', 'wood',
//   'ever', 'work', 'flow', 'like',
//   'rule', 'trip', 'wave', 'that',
//   'free', 'year', 'rest', 'main' ]
```

- decode( array[, dictionary ] ) : buffer

Take an array of simplecoder-encoded values and an optional dictionary and
produce an output buffer. If the dictionary is not specified, the default
simple 4-letter word English dictionary will be assumed.

Example:

```javascript
simplecoder.decode( [
    'such', 'mean', 'pull', 'wood',
    'ever', 'work', 'flow', 'like',
    'rule', 'trip', 'wave', 'that',
    'free', 'year', 'rest', 'main'
] );

// ->
// <Buffer c2 7c 98 fa 32 fc 40 6e a7 dd eb ce 44 fe 9e 77>

```

## Contributing

Pull requests are very welcome! Just make sure your code:

1) Has no jshint warnings or errors according to the config in package.json
2) Is beautified using jsbeautifier and the included .jsbeautifyrc
3) Has tests and all tests pass

## Why?

I was looking for a way to produce human-readable hashes and ids that could
be more easily shared and verified via things like phone calls.

# CHANGELOG

v0.0.x
-----
- Prototyping
