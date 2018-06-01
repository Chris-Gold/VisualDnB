const express = require('express');
const router = express.Router(); 

// Affiche la page de tous les produits
router.get('/all-produits', function(req, res){
    res.status(200).render('front/all-produits.hbs');
});

module.exports = router;