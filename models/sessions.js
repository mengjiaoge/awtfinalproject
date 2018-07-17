var CoursesSchemaModel = require('../schemas/courses');
var express = require('express');
var router = express.Router();
var question = require( './questions');

router.use('/questions',question);
router.post('/save', function (req, res) {

    console.log(req.body);
    let course = new CoursesSchemaModel(req.body);
    var query = {'_id': req.body.id};
    var addSessionQuery={'courses.session': [req.body.session]};
    CoursesSchemaModel.findOneAndUpdate(
        query,
        {$push: req.body},
        {upsert: true},
        function (err, doc) {
        if (err) return res.send({error: err.message});
        res.send(doc);
    });
    // CoursesSchemaModel.update(
    //     query,
    //     {'$push':addSessionQuery},
    //     function (err,response) {
    //         if(err) return res.send(err.message);
    //         console.log(err,response);
    //         res.send(response);
    //     }
    // );
});
//
router.post('/find', function (req, res) {
    console.log(req.body);
    let user = new CoursesSchemaModel({});
    let id = req.body.id;
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
// router.get('/getall', function (req, res) {
//     console.log('findAll');
//     let user = new CoursesSchemaModel({});
//     let id = req.query.id;
//     CoursesSchemaModel.find({}, function (err, foundData) {
//         if (err) {
//             console.log(err.message);
//             res.send(err.message);
//
//         }
//         else {
//             // console.log(foundData);
//             res.send(JSON.stringify(foundData));
//         }
//     });
//


module.exports = router;
