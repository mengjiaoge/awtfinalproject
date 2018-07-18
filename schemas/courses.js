var mongoose = require('mongoose');
var users = require('./users');
var questions = require('./questions');
var User = new users;
var Question = new questions;

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
        title: String,
        description: String,
        date: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question'
            }
        ]
    },
    ],

});
exports.CoursesSchema = CoursesSchema;
module.exports = mongoose.model('courses', CoursesSchema);