const express = require('express');
const router = express.Router(); 

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


module.exports = router;