const express = require('express');
const router = express.Router();
// const users= require('../models/users');
const courses = require('../models/courses');
const sessions = require('../models/sessions');
const users= require ('./users');
const blogs= require ('./blogs');



router.use('/courses',courses);
router.use ('/sessions',sessions);
router.use ('/users',users);
router.use ('/questions',blogs(router));


module.exports = router;