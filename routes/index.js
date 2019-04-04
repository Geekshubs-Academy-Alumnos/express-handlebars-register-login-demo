var express = require( 'express' );
const User = require( '../models/user' );
const email = require('../config/nodemailer.js');
var router = express.Router();

const winston = require('../config/winston.js');


const upload = require('../config/multer');
/* GET home page. */
router.get( '/', function ( req, res, next ) {

    res.redirect( '/login');
} );

// register
router.get( '/register', function ( req, res, next ) {

    res.render( 'register' );
} );

router.post( '/register', function ( req, res, next ) {

    winston.info( req.body );
    new User( req.body )
        .save()
        .then( () => {
            winston.info( 'registro valido' );

            email.transporter.sendMail( {
                to: req.body.email,
                subject: 'Registro correcto',
                html: 'Welcome!'
            }, ( error, info ) => {
                winston.info(error, info);
            } );


            res.render( 'register', { message: 'Registro válido. Ya puedes hacer login' } );


        } )
        .catch( ( err ) => {
            winston.info( 'registro invalido', err );

            res.render( 'register', { error: err.message } );

        } )
} );

// login
router.get( '/login/:email?/:pass?', function ( req, res, next ) {

    res.render( 'login' , {email: req.params.email, pass: req.params.pass});
} );

router.post( '/login', function ( req, res, next ) {

    winston.debug( JSON.stringify( req.body ) );

    User.findOne( req.body )
        .then( ( user ) => {
            winston.info( 'login valido', user );
            if ( user ) {
                req.session.user = user;
                res.redirect( '/home' );
            } else {
                res.render( 'login', { error: 'credenciales incorrectos' } );

            }
        } )
        .catch( ( err ) => {
            winston.info( 'login invalido', err );
            res.render( 'login', { error: 'Ups algo no ha ido bien.  vuelva intentarlo más tarde' } );

        } )
} );


// recovery
router.get( '/recovery/:email?', function ( req, res, next ) {

    res.render( 'recovery' , {email:req.params.email});
} );

router.post( '/recovery/', function ( req, res, next ) {

    winston.info( 'email to recovery:', req.body.email );


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
                            <a href="http://localhost:3000/login/${user.email}/${user.password}">LOGIN</a>
                          </p>
                      `
                  }, ( error, info ) => {
                      winston.info( error, info );
                  } );
             }

        }
    ).catch (console.error)

} );



// home
router.get( '/home', function ( req, res, next ) {

    if (req.session.user) {

        res.render( 'home', {email: req.session.user.email} );
    } else {
        res.send('not authorized')
    }
} );

router.get( '/logout', function ( req, res, next ) {

    req.session.destroy();
    res.redirect('/');

} );


// gatos
router.get( '/nuevoGato', function ( req, res, next ) {

   res.render('upload')

} );
router.post( '/nuevoGato', upload.single( 'file' ) , function ( req, res, next ) {

    res.render( 'upload' , {message:'Foto subida!'})

} );


module.exports = router;
