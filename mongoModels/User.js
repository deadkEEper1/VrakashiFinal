var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

    name:{
        required: true,
        type: String
    },
    email:{
        unique: true,
        required: true,
        type: String

    },
    password:{
        required: true,
        type: String
    },

    admin: {
        type: Boolean,
        default: false
    }
});

var User = mongoose.model('users', userSchema);
module.exports = User
