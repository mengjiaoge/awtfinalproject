const User = require('../models/user'); // Import User Model Schema
const Blog = require('../models/blogs'); // Import Blog Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration


module.exports = (router) => {
    
    router.post('/newBlog', (req, res) => {
        // Check if blog title was provided
        if (!req.body.title) {
          res.json({ success: false, message: 'Blog title is required.' }); // Return error message
        } else {
          // Check if blog body was provided
          if (!req.body.body) {
            res.json({ success: false, message: 'Blog body is required.' }); // Return error message
          } else {
              console.log(req.body);
              // Create the blog object for insertion into database
              const blog = new Blog({
                title: req.body.title, // Title field
                body: req.body.body, // Body field
                createdBy: req.body.user, // CreatedBy field
                course : req.body.course[0],
                session: req.body.course[0].session
              });
              // Save blog into database
              blog.save((err) => {
                // Check if error
                if (err) {
                  // Check if error is a validation error
                  if (err.errors) {
                    // Check if validation error is in the title field
                    if (err.errors.title) {
                      res.json({ success: false, message: err.errors.title.message }); // Return error message
                    } else {
                      // Check if validation error is in the body field
                      if (err.errors.body) {
                        res.json({ success: false, message: err.errors.body.message }); // Return error message
                      } else {
                        res.json({ success: false, message: err }); // Return general error message
                      }
                    }
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                } else {
                  res.json({ success: true, message: 'Question saved!' }); // Return success message
                }
              });
            }
          }
        
      });

    router.post('/getQuestions',(req,res)=>{
        course=req.body.course[0];
        session=req.body.session;
        console.log(course);
        Blog.find({"course._id":course._id}, function (err, foundData) {
            if (err) {
                console.log(err.message);
                res.send(err.message);

            }
            else {
                // console.log(foundData);
                res.send(JSON.stringify(foundData));
            }
        });
         // res.send(course);

    });

    return router;
}