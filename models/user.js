const mongoose = require('../config/mongo');

const UserSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }

} );

const User = mongoose.model( 'user', UserSchema )

module.exports = User;
