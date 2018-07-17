const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const routes=require('./routes/routes');
const config = require('./config/database');

//Initializing Express
const app = express();

//Using Express router that all the user routes will put in a separate file
var users = require('./routes/users');

const port = 3000;
//Connect To Database
mongoose.connect(config.database);


//On Connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database'+config.database);
});

//On Error
mongoose.connection.on('error',(err)=>{
    console.log('Database error'+err);
});



//cors
//allow to make a requset to our api from a different domain name
//by default they would get blocked if they try to do certain request
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
//Parses incoming request body like when you submit a form that can grab the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// BodyParser Middleware


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//adding a socket for real time updates
var http = require('http').Server(app);
io = require('socket.io')(http);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

//Anything that after '/users' will go to that file
app.use('/users', users);

//route to api
app.use('/api',routes);

//if the route didn't match
app.use(function redirectUnmatched(req, res) {
    res.send("Invalid EndPoint");
});

//Start Server
http.listen(port,()=>{
    console.log('Server started on port '+port);
});