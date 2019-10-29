#!/usr/bin/env node
'use strict';

const simplecoder = require( './index.js' );

function handle_operation( operation, value ) {
    switch( operation ) {
        case 'decode':
            console.log( '"' + simplecoder.decode( value.split( '-' ) ).toString() + '"' );
            break;
        case 'encode':
            if ( /^0x[0-9a-f]/i.test( value ) ) {
                value = value.substr( 2 );
                const bytes = [];
                for( let i = 0; i < value.length; i += 2 ) {
                    bytes.push( parseInt( value.substr( i, 2 ), 16 ) );
                }
                value = bytes;
            }
            console.log( simplecoder.encode( Buffer.from( value ) ).join( '-' ) );
            break;
        default:
            console.error( `unknown operation: ${ operation }` );
            break;
    }
}

if ( process.argv.length === 2 ) {
    const readline = require( 'readline' );
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    } );

    rl.on( 'line', line => {
        const [ operation, value ] = line.split( ' ', 2 );
        handle_operation( operation, value );
    } );
}
else if ( process.argv.length === 3 ) {
    const operation = process.argv[ 2 ].toLowerCase();

    const readline = require( 'readline' );
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout
    } );

    rl.on( 'line', line => {
        handle_operation( operation, line );
    } );
}
else if ( process.argv.length === 4 ) {
    const operation = process.argv[ 2 ].toLowerCase();
    const value = process.argv[ 3 ];
    handle_operation( operation, value );
}
else {
    console.error( 'Usage: simplecoder [<encode|decode> <value>]' );
}
