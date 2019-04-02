var express = require( 'express' );
const User = require( '../models/user' );
var router = express.Router();

/* GET home page. */
router.get( '/', function ( req, res, next ) {

    res.render( 'index', { title: 'Express' } );
} );

// register
router.get( '/register', function ( req, res, next ) {

    res.render( 'register' );
} );

router.post( '/register', function ( req, res, next ) {

    console.log( req.body );
    new User( req.body )
        .save()
        .then( () => {
            console.log( 'registro valido' );

            res.render( 'register', { message: 'Registro válido. Ya puedes hacer login' } );

        } )
        .catch( ( err ) => {
            console.log( 'registro invalido', err );

            res.render( 'register', { error: err.message } );

        } )
} );

// login
router.get( '/login', function ( req, res, next ) {

    res.render( 'login' );
} );

router.post( '/login', function ( req, res, next ) {

    console.log( req.body );

    User.findOne( req.body )
        .then( ( user ) => {
            console.log( 'login valido', user );
            if ( user ) {
                res.render( 'login', { message: 'Bienvenido al castillo! ' + user.email } );
            } else {
                res.render( 'login', { error: 'credenciales incorrectos' } );

            }
        } )
        .catch( ( err ) => {
            console.log( 'login invalido', err );
            res.render( 'login', { error: 'Ups algo no ha ido bien.  vuelva intentarlo más tarde' } );

        } )
} );

module.exports = router;
