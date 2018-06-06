const express = require('express');
const router = express.Router(); 
const Article = require('../models/article');

router.get('/', function(req, res){ 
    Article.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("front/all-articles", {title: "Tous les articles", description: "Postés auparavant", articles: results});
    })
});

module.exports = router;