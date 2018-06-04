const express = require('express');
const router = express.Router(); 
const BlogPost = require('../models/blogpost');

router.get('/', function(req, res){
    res.status(200).render('back/index.hbs');
});

// router.post('/', function(req, res){
//     var bp = new BlogPost();
//     bp.title = req.body.title;
//     bp.message = req.body.message;
//     bp.save(function(err){
//         if (err){
//             res.render('back/index.hbs', {title: "Administration", description: "Une erreur s'est produite"});
//         }
//         res.render('back/index.hbs', {title: "Administration", description: "Blog post sauvegardé"});
//     })
//     function redirect() {
//         window.location.assign("http://localhost:8000/admin#presta");
//     }
// });

module.exports = router;