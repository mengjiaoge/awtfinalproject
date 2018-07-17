var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    lecturer: {
        type: Boolean,
    },
});

exports.userSchema = usersSchema;
module.exports = mongoose.model('users', usersSchema);