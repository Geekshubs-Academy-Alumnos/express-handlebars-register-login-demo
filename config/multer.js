const Multer = require( 'multer' );
const winston = require('./winston');
const options = {
    storage: Multer.diskStorage( {
        destination: ( req, file, callback ) => {
            callback( null, './uploads/' );
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
        },

    } ),
    fileFilter: ( req, file, callback ) => {

        winston.debug( file );

        if ( file.mimetype === 'image/png' ) {
            callback(null , true)
        } else {
            callback( null, false )

        }


    },
    limits: {fileSize: Infinity}
}
const upload = Multer( options );

module.exports = upload;