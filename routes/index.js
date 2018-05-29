const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router(); 
// Récupération du client mongodb
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
// Paramètres de connexion
var url = 'mongodb://localhost:27017/visualdnb';


// ROUTES FRONT

// Si l'url est celle d'un membre, affiche sa page.
router.get('/member/:name', function(req, res){
    const member = req.params.member;
    res.status(200).render('front/member.hbs', {
        member: member
    });
});

// Si l'url indique un product du shop alors on affiche la page produit adéquat
router.get('/shop/:product', function(req, res){
    const product = req.params.product;
    res.status(200).render('front/product.hbs', {
        product: product
    });
});

// Si l'url indique product alors on affiche la page produit
router.get('/shop', function(req, res){
    res.status(200).render('front/shop.hbs');
});

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

// ROUTES BACK
// Si l'url indique admin alors on affiche la page login
router.get('/adminIndex', function(req, res){
    res.status(200).render('back/adminIndex.hbs');
});

router.get('/admin', function(req, res){
    res.status(200).render('back/login.hbs');
});

// POST BACK
router.post('/admin', function(req, res){
    let id = req.body.id;
    let mdp = req.body.mdp;
    console.log(id + ' ' + mdp);

    // Connection à la bdd pour checker les inputs et la bdd afin de changer le status admin en bdd de false à true
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("visualdnb");
        dbo.collection("admin").findOne({}, function(req, res) {
            if (err) throw err;
            if ((id === res.identifiant) && (mdp === res.mdp)){
                console.log(res.admin);
                var adminStatus = { admin: false };
                var newAdminStatus = { $set: { admin: true } };
                dbo.collection("admin").updateOne(adminStatus, newAdminStatus, function(err, res){ 
                    db.close();
                });
            }
        });
    });
    res.redirect('/adminIndex'); 
});

module.exports = router;