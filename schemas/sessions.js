var mongoose = require('mongoose');
var users = require('./users');

var User = new users;

var SessionsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    date: {type: Date,default : Date.now},
    active: Boolean,
    courses: [{
        _id: mongoose.Schema.Types.ObjectId,
        title : String,
        description : String,
    }],
   
});
exports.SessionsSchema=SessionsSchema;
module.exports = mongoose.model('sessions', SessionsSchema);