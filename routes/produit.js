const express = require('express');
const router = express.Router(); 

// Si l'url indique un product du shop alors on affiche la page produit adéquat
router.get('/:produit', function(req, res){
    let produit = req.params.produit;
    res.status(200).render('front/produit.hbs', {
        produit: produit
    });
});


module.exports = router;
