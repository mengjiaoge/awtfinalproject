var mongoose = require('mongoose');
var users = require('./users');
var course = require('./courses');

var User = users.userSchema;
var Course = course.CoursesSchema;

var QuestionSchema = mongoose.Schema({

    text: {
        type: String,
        // required: true,
        unique: true
    },
    description: String,
    postetBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    answer: [
        {
            answerText: {
                type: String,
            },
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date,
                default: Date.now
            },
            qestionId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'QuestionSchema'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
});

exports.QuestionSchema = QuestionSchema;
module.exports = mongoose.model('question', QuestionSchema);