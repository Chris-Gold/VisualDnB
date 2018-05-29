const express = require('express');
const router = express.Router(); 

// Si l'url indique un product du shop alors on affiche la page produit adéquat
router.get('/shop/:product', function(req, res){
    const product = req.params.product;
    res.status(200).render('product.hbs', {
        product: product
    });
});

// Si l'url indique product alors on affiche la page produit
router.get('/shop', function(req, res){
    res.status(200).render('shop.hbs');
});

// Si l'url est celle d'un membre, affiche sa page.
router.get('/:member', function(req, res){
    const member = req.params.member;
    res.status(200).render('member.hbs', {
        member: member
    });
});

// On get l'url, si = '/' alors affiche le fichier index.html
router.get('/', function(req, res){ 
    res.status(200).render('index.hbs'); // (Les status sont visibles dans le network)
});

router.post('/', function(req, res){
    let nom = req.body.nom;
    let email = req.body.email;
    let siteWeb = req.body.siteWeb;
    let message = req.body.message;
    res.send(nom + ' ' + email + ' ' + siteWeb + ' ' + message);
});

module.exports = router;