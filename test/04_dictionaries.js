'use strict';

const fs = require( 'fs' );
const path = require( 'path' );
const tape = require( 'tape' );

const dictionaries_path = path.join( __dirname, '..', 'dictionaries' );
const dictionaries = {};

fs.readdirSync( dictionaries_path ).forEach( file => {
    dictionaries[ file ] = require( path.join( dictionaries_path, file ) );
} );

tape( 'dictionaries: no duplicate entries', t => {
    Object.keys( dictionaries ).forEach( dictionary_id => {
        const dictionary = dictionaries[ dictionary_id ];
        const entries = dictionary.reduce( ( _entries, current ) => {
            _entries[ current ] = _entries[ current ] ? _entries[ current ] + 1 : 1;
            return _entries;
        }, {} );

        const has_multiple_entries = Object.keys( entries ).some( entry => {
            return entries[ entry ] > 1;
        } );

        t.notOk( has_multiple_entries, `${ dictionary_id }: all entries are unique` );

        if ( has_multiple_entries ) {
            const collisions = Object.keys( entries ).filter( entry => {
                return entries[ entry ] > 1;
            } );

            console.dir( collisions );
        }
    } );
    t.end();
} );

tape( 'dictionaries: all dictionaries are correct size', t => {
    Object.keys( dictionaries ).forEach( dictionary_id => {
        const dictionary = dictionaries[ dictionary_id ];

        t.equal( dictionary && dictionary.length, 256, `${ dictionary_id }: has 256 entries` );
    } );
    t.end();
} );
