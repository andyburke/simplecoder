wordcoder
=========

wordcoder allows you to encode data using common English words. Think of it like
base64, but instead of characters, we're using 256 common 4-letter English words.

For instance, you could encode a UUID:

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

down tone band tall
miss boat able ship
case cook suit ever
page rule just salt
deal post cost talk
town page seed hand
pick ship long town
card lift like pair
```

SHA512 may be pushing it, but...:

```
408b27d3097eea5a46bf2ab6433a7234a33d5e49957b13ec7acc2ca08e1a13c75272c90c8d3385d47ede5420a7a9623aad817d9f8a70bd100a0acea7400daa59

flow note dear thus bell milk wash home
full star door skin form feet look fact
roll fire idea glad play mass both wear
mark term draw ring over case both take
head look tall blow open face name time
milk true heat cool rule salt jump feet
sell more mile ride nose list soon bone
best best that rule flow blue same hold
```

## Installation

```
npm install wordcoder
```

## Usage

```javascript
const uuid = require( 'uuid' );
const wordcoder = require( 'wordcoder' );

// create a uuid in a buffer (avoid encoding as hex and doubling size)
const my_uuid = uuid.v4( null, Buffer.alloc( 16 ) );
const encoded = wordcoder.encode( guid );

// ->
// [ 'such', 'mean', 'pull', 'wood',
//   'ever', 'work', 'flow', 'like',
//   'rule', 'trip', 'wave', 'that',
//   'free', 'year', 'rest', 'main' ]

const decoded = wordcoder.decode( encoded );

// ->
// <Buffer c2 7c 98 fa 32 fc 40 6e a7 dd eb ce 44 fe 9e 77>

decoded.toString( 'hex' );

// ->
// 'c27c98fa32fc406ea7ddebce44fe9e77'

```

### API

- encode( buffer | array | string ) : array

Takes the given buffer, array or string and returns an encoded array of common
4-letter english words.

Example:

```javascript
wordcoder.encode( uuid.v4( null, Buffer.alloc( 16 ) ) );

// ->
// [ 'such', 'mean', 'pull', 'wood',
//   'ever', 'work', 'flow', 'like',
//   'rule', 'trip', 'wave', 'that',
//   'free', 'year', 'rest', 'main' ]
```

- decode( array ) : buffer

Take an array of wordcoder-encoded words and produces an output buffer.

Example:

```javascript
wordcoder.decode( [
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

v0.0.1
------
- Prototyping
