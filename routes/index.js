const express = require('express');
const router = express.Router(); 
const BlogPost = require('../models/blogpost');

// GET l'url, si = '/' alors affiche le fichier index.html
router.get('/', function(req, res){ 
    BlogPost.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("front/index", {blogPosts: results});
    })
    // res.status(200).render('front/index.hbs');
});

router.get('/edit-article/:id', function(req, res){
    let blogId = req.params.id;
    BlogPost.findById(blogId, function(err, result){
        if (err) throw err;
        let pageTitle = "Mise à jour de '" + result.title + "'"
        return res.render('back/edit-article', {title: pageTitle, blogPost: result});
    });
});

router.post('/edit-article/:id', function(req, res){
    let blogId = req.params.id;
    BlogPost.update({_id: blogId}, {title: req.body.title, message: req.body.message}, function(err, numRowsAffected, rawResponse){
        if (err) throw err;
        res.redirect('/all-articles');
    })
});

router.get('/delete-article/:id', function(req, res){
    let blogId = req.params.id;
    BlogPost.findByIdAndRemove(blogId, function(err){
        if(err) throw err;
        res.redirect('/all-articles');
    });
});

// POST 
router.post('/', function(req, res){
    let nom = req.body.nom;
    let email = req.body.email;
    let siteWeb = req.body.siteWeb;
    let message = req.body.message;
    res.send(nom + ' ' + email + ' ' + siteWeb + ' ' + message);
});



module.exports = router;