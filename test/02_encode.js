'use strict';

const wordcoder = require( '../index.js' );
const tape = require( 'tape' );

tape( 'encode: encodes a string', t => {
    const encoded = wordcoder.encode( 'hello world' );
    t.ok( encoded, 'got a return value' );
    t.ok( Array.isArray( encoded ), 'return value is an array' );
    t.deepEqual( encoded, [ 'land', 'kind', 'life', 'life', 'line', 'cool', 'main', 'line', 'look', 'life', 'keep' ], 'encoded value is correct' );
    t.end();
} );

tape( 'encode: encodes an array', t => {
    const encoded = wordcoder.encode( [ 1, 2, 3 ] );
    t.ok( encoded, 'got a return value' );
    t.ok( Array.isArray( encoded ), 'return value is an array' );
    t.deepEqual( encoded, [ 'also', 'atom', 'baby' ], 'encoded value is correct' );
    t.end();
} );

tape( 'encode: encodes a buffer', t => {
    const encoded = wordcoder.encode( Buffer.alloc( 4, 'abcd' ) );
    t.ok( encoded, 'got a return value' );
    t.ok( Array.isArray( encoded ), 'return value is an array' );
    t.deepEqual( encoded, [ 'join', 'jump', 'just', 'keep' ], 'encoded value is correct' );
    t.end();
} );
