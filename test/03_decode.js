'use strict';

const simplecoder = require( '../index.js' );
const tape = require( 'tape' );

tape( 'decode: decodes properly', t => {

    // 1, 2, 3
    const result = simplecoder.decode( [ 'also', 'atom', 'baby' ] );

    t.ok( Buffer.isBuffer( result ), 'return value is a buffer' );

    const result_array = [].slice.call( result, 0 );

    t.deepEqual( result_array, [ 1, 2, 3 ], 'decoded value is correct' );
    t.end();
} );
