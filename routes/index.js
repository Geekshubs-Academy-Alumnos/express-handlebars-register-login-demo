var express = require( 'express' );
const User = require( '../models/user' );
const email = require('../config/nodemailer.js');
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

            email.transporter.sendMail( {
                to: req.body.email,
                subject: 'Registro correcto',
                html: 'Welcome!'
            }, ( error, info ) => {
                console.log(error, info);
            } );


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


// recovery
router.get( '/recovery/:email?', function ( req, res, next ) {

    res.render( 'recovery' , {email:req.params.email});
} );

router.post( '/recovery/', function ( req, res, next ) {

    console.log( 'email to recovery:', req.body.email );


    User.findOne( { email: req.body.email } ).then(
        (user) => {

             res.render( 'recovery', {message: 'Si el email estaba registrado le enviaremos un email con su contraseña'});
             if (user) {
                  email.transporter.sendMail( {
                      to: req.body.email,
                      subject: 'Recovery',
                      html: `
                          <h4>Tu password es: <strong>${user.password}</strong></h4>
                          <p>
                            <a href="http://localhost:3000/login">LOGIN</a>
                          </p>
                      `
                  }, ( error, info ) => {
                      console.log( error, info );
                  } );
             }

        }
    ).catch (console.error)

} );


module.exports = router;
