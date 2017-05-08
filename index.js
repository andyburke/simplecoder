'use strict';

const DEFAULT_DICTIONARY = require( './dictionaries/en' );

// NOTE: changing the block size to something other than a byte will require
//       reworking the internals because we rely on Buffer.readUInt8()/Buffer.writeUInt8().
const ENCODING_BLOCK_SIZE = 8; // 256 entry dictionaries
const REQUIRED_DICTIONARY_LENGTH = 256;

module.exports = {
    encode: function( _input, _dictionary ) {
        const dictionary = _dictionary || DEFAULT_DICTIONARY;

        if ( !Array.isArray( dictionary ) ) {
            throw new Error( `Missing dictionary!` );
        }

        if ( dictionary.length !== REQUIRED_DICTIONARY_LENGTH ) {
            throw new Error( `Invalid dictionary! Required length: ${ REQUIRED_DICTIONARY_LENGTH } / Actual length: ${ dictionary.length }` );
        }

        const input = Buffer.isBuffer( _input ) ? _input : Buffer.from( _input );

        const encoded = [];

        for( let i = 0; i < input.length; ++i ) {
            const raw_value = input.readUInt8( i );
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

        const decoded = Buffer.alloc( Math.ceil( ( input.length * ENCODING_BLOCK_SIZE ) / 8 ) );

        input.forEach( ( word, index ) => {
            const value = dictionary.indexOf( word );
            if ( value === -1 ) {
                throw new Error( `Invalid word: ${ word }` );
            }
            decoded.writeUInt8( value, index );
        } );

        return decoded;
    }
};