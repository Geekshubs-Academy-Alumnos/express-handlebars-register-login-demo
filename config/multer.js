const Multer = require( 'multer' );
const options = {
    storage: Multer.diskStorage( {
        destination: ( req, file, callback ) => {
            callback( null, './uploads/' );
        },
        filename: ( req, file, callback ) => {
            callback( null, file.originalname );
        }
    } )
}
const upload = Multer( options );

module.exports = upload;