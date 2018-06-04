const express = require('express');
const router = express.Router(); 
const BlogPost = require('../models/blogpost');

router.get('/', function(req, res){ 
    BlogPost.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("front/all-articles", {title: "Tous les articles", description: "Postés auparavant", blogPosts: results});
    })
});

module.exports = router;