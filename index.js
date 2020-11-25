const express = require( 'express' );
const dotenv = require( 'dotenv' ).config();
const cors = require( 'cors' );
const path = require('path');
const { dbConnection } = require( './database/config' );

if( dotenv.error ) {
    throw dotenv.error;
}

const app = express();

/**************************************************************************** BASE DE DATOS ****************************************************************************/
dbConnection();

/**************************************************************************** CORS ****************************************************************************/
app.use( cors() );

/************************************************************************** DIRECTORIO PUBLICO **************************************************************************/
app.use( express.static( 'public' ) );

/********************************************************************** LECTURA Y PARSEO DEL BODY **********************************************************************/
app.use( express.json() );

/****************************************************************************** ENDPOINTS ******************************************************************************/
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/events', require( './routes/events' ) );
app.get( '*', ( req, res ) => {
    res.sendFile( path.join( `${ __dirname }/public/index.html` ) );
} );

app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en puerto: ${ process.env.PORT }` );
} );
