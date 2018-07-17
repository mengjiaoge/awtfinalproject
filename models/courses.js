var CoursesSchemaModel = require('../schemas/courses');
var express = require('express');
var router = express.Router();
var sessions =require('./sessions');



router.use('/sessions',sessions);
router.post('/save', function (req, res) {

    console.log(req.body);
    let course = new CoursesSchemaModel(req.body);

    course.save(function (err) {
        if (err) {
            console.log('error in save');
            res.send(err.message);
        }
        else{
            io.emit('course', 'newAdded');
            res.send({users: 'added'});
        }
    });
});

router.get('/', function (req, res) {
    console.log('findOne');
    let user = new CoursesSchemaModel({});
    let id = req.query.id;
    CoursesSchemaModel.find({'_id': id}, function (err, foundData) {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        }
        else {
            console.log(foundData);
            res.send(JSON.stringify(foundData));
        }
    });

});
router.get('/getall', function (req, res) {
    console.log('findAll');
    let user = new CoursesSchemaModel({});
    let id = req.query.id;
    CoursesSchemaModel.find({}, function (err, foundData) {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        }
        else {
            // console.log(foundData);
            res.send(JSON.stringify(foundData));
        }
    });

});
module.exports = router;
