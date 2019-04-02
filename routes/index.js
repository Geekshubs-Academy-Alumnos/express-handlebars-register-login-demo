var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get( '/register', function ( req, res, next ) {

    res.render( 'register');
} );

router.post( '/register', function ( req, res, next ) {

     console.log(req.body);

    new User(req.body)
    .save()
      .then( () => {
        console.log('registro valido');

       res.render( 'register', { message: 'Registro válido. Ya puedes hacer login' } );

      })
      .catch( (err) => {
        console.log( 'registro invalido', err );

          res.render( 'register', { error: err.message } );

      })
} );

module.exports = router;
