'use strict';

const Bit_Stream = require( 'bit-buffer' ).BitStream;

const DEFAULT_DICTIONARY = require( './dictionaries/en' );

const ENCODING_BLOCK_SIZE = 8; // 256 entry dictionaries
const REQUIRED_DICTIONARY_LENGTH = Math.pow( 2, ENCODING_BLOCK_SIZE );

module.exports = {
    encode: function( input, _dictionary ) {
        const dictionary = _dictionary || DEFAULT_DICTIONARY;

        if ( !Array.isArray( dictionary ) ) {
            throw new Error( `Missing dictionary!` );
        }

        if ( dictionary.length !== REQUIRED_DICTIONARY_LENGTH ) {
            throw new Error( `Invalid dictionary! Required length: ${ REQUIRED_DICTIONARY_LENGTH } / Actual length: ${ dictionary.length }` );
        }

        const bit_stream = new Bit_Stream( Buffer.isBuffer( input ) ? input : Buffer.from( input ) );

        const encoded = [];

        while ( bit_stream.bitsLeft > 0 ) {
            const raw_value = bit_stream.readBits( Math.min( ENCODING_BLOCK_SIZE, bit_stream.bitsLeft ), false );
            const encoded_value = dictionary[ raw_value ];
            if ( !encoded_value ) {
                throw new Error( `Could not encode value: ${ raw_value }` );
            }
            encoded.push( encoded_value );
        }

        return encoded;
    },

    decode: function( input, _dictionary ) {
        const dictionary = _dictionary || DEFAULT_DICTIONARY;

        if ( !Array.isArray( dictionary ) ) {
            throw new Error( `Missing dictionary!` );
        }

        if ( dictionary.length !== REQUIRED_DICTIONARY_LENGTH ) {
            throw new Error( `Invalid dictionary! Required length: ${ REQUIRED_DICTIONARY_LENGTH } / Actual length: ${ dictionary.length }` );
        }

        const decoded_stream = new Bit_Stream( Buffer.alloc( Math.ceil( ( input.length * ENCODING_BLOCK_SIZE ) / 8 ) ) );

        input.forEach( word => {
            const index = dictionary.indexOf( word );
            if ( index === -1 ) {
                throw new Error( `Invalid word: ${ word }` );
            }
            decoded_stream.writeBits( index, ENCODING_BLOCK_SIZE );
        } );

        return decoded_stream.view.buffer;
    }
};