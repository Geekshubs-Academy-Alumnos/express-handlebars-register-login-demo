const appRoot = require( 'app-root-path' );
const winston = require( 'winston' );

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/info.log`,
        handleExceptions: true,
        format: winston.format.simple(),
        maxsize: 5242880,
        maxFiles: 5,
    },
    console: {
        level: 'silly',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
};

var logger = winston.createLogger( {
    transports: [
        new winston.transports.File( options.file ),
        new winston.transports.Console( options.console )
    ],
    exitOnError: false,
} );

logger.stream = {
    write: function ( message, encoding ) {
        logger.info( message );
    }
}
module.exports = logger;