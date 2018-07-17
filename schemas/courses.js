var mongoose = require('mongoose');
var users = require('./users');

var User = new users;

var CoursesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    passKey: String,
    description: String,
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sessions: [{
        _id: mongoose.Schema.Types.ObjectId,
        title : String,
        description : String,
        date: {type: Date,
            default : Date.now},
        active: Boolean,

    }],
    allowedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

});
exports.CoursesSchema=CoursesSchema;
module.exports = mongoose.model('courses', CoursesSchema);