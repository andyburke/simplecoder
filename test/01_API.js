'use strict';

const simplecoder = require( '../index.js' );
const tape = require( 'tape' );

tape( 'API: exports properly', t => {
    t.ok( simplecoder, 'module exports' );
    t.equal( simplecoder && typeof simplecoder.encode, 'function', 'exports encode method' );
    t.equal( simplecoder && typeof simplecoder.decode, 'function', 'exports decode method' );
    t.end();
} );
