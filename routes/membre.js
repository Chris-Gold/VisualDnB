const express = require('express');
const router = express.Router(); 

// Ici ':' permet d'utiliser nom comme une variable. (idem dans produits)
router.get('/membre/:nom', function(req, res){
    const membre = req.params.membre;
    res.status(200).render('front/membre.hbs', {
        membre: membre
    });
});

module.exports = router;