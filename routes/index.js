const express = require('express');
const router = express.Router(); 
const Visuel = require('../models/visuel');
// GET l'url, si = '/' alors affiche le fichier index.html
router.get('/', function(req, res){ 
    Visuel.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("front/index", {visuels: results});
    })
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