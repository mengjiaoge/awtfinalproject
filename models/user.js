var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
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

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    //hash the pwd
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) return err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}