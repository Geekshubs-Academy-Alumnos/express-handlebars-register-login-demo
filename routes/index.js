var express = require('express');
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


  // res.render( 'register' , {error: 'email ya está siendo utilizado'});
  res.render( 'register' , {message: 'Registro válido. Ya puedes hacer login'});




} );

module.exports = router;
