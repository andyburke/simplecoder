'use strict';

const wordcoder = require( './index.js' );

const operation = ( process.argv[ 2 ] || '' ).toLowerCase();
const value = ( process.argv[ 3 ] || '' );
switch( operation ) {
    case 'decode':
        console.log( '"' + wordcoder.decode( value.split( '-' ) ).toString() + '"' );
        break;
    case 'encode':
        console.log( wordcoder.encode( new Buffer( value ) ).join( '-' ) );
        break;
    default:
        console.error( `unknown operation: ${ operation }` );
        break;
}