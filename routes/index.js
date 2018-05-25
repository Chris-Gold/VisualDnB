const express = require('express');
const router = express.Router(); 

// ROUTES FRONT
// On get l'url, si = '/' alors affiche le fichier index.html
router.get('/', function(req, res){ 
    res.status(200).render('front/index.hbs'); // (Les status sont visibles dans le network)
});

// POST FRONT
router.post('/', function(req, res){
    let nom = req.body.nom;
    let email = req.body.email;
    let siteWeb = req.body.siteWeb;
    let message = req.body.message;
    res.send(nom + ' ' + email + ' ' + siteWeb + ' ' + message);
});

module.exports = router;