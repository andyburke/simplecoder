'use strict';

const wordcoder = require( '../index.js' );
const tape = require( 'tape' );

tape( 'API: exports properly', t => {
    t.ok( wordcoder, 'module exports' );
    t.equal( wordcoder && typeof wordcoder.encode, 'function', 'exports encode method' );
    t.equal( wordcoder && typeof wordcoder.decode, 'function', 'exports decode method' );
    t.end();
} );
