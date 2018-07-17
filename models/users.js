const UserSchemaModel = require('../schemas/users');

class Users {
    save(submittedDate, res) {
        console.log('here');
        let user = new UserSchemaModel({email: 'testali', password: 'teret',firstName: 'teset', lastName: 'testali'});
        // console.log(submittedDate);
        // var user = new User({username: req.body.username,password: req.body.password});

        user.save(function (err) {
            if (err) {
                console.log('error in save');
                res.send(err.message);
            }
            else
                res.send( {users: 'added'});
        });
    };
    find(submittedDate, res) {
        console.log('find');
        let user = new UserSchemaModel({});
        // console.log(submittedDate);
        // var user = new User({username: req.body.username,password: req.body.password});

        UserSchemaModel.find({},function (err,foundUser) {
            if (err) {
                res.send(err.message);
            }
            else{
                res.send( {users: foundUser});
            }
        });
    };
}

module.exports = new Users
