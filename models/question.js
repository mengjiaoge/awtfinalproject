var QuestionSchemaModel = require('../schemas/questions');
var express = require('express');
var router = express.Router();

router.post('/save',function (req,res) {

    console.log(req.body);
    var question = new QuestionSchemaModel(req.body);
    question.save(function (err, foundData) {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        }
        else {
            // console.log(foundData);
            io.emit('messagee', 'hi');
            res.send(JSON.stringify(foundData));
        }

    })
});

router.post('/update',function (req,res) {

    console.log(req.body);
    var id=req.body._id;
    QuestionSchemaModel.findByIdAndUpdate(id,{$set: req.body},{new:true},function (err, foundData) {
        if (err) {
            console.log(err);
            res.send(err.message);

        }
        else {
            // console.log(foundData);
            io.emit('messagee', 'hi');
            res.send(JSON.stringify(foundData));
        }

    })
});

router.get('/',function (req,res) {
    console.log('findOne');
    let question = new QuestionSchemaModel({});
    let id = req.query.id;
    QuestionSchemaModel.find({'_id':id},function (err,foundData) {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        }
        else{
            console.log(foundData);
            res.send( JSON.stringify(foundData));
        }
    });

});
router.get('/getall',function (req,res) {
    console.log('findAll');
    let question = new QuestionSchemaModel({});
    let id = req.query.id;
    QuestionSchemaModel.find({},function (err,foundData) {
        if (err) {
            console.log(err.message);
            res.send(err.message);

        }
        else{
            // console.log(foundData);
            res.send( JSON.stringify(foundData));
        }
    });

});

module.exports = router;
