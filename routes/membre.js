const express = require('express');
const router = express.Router(); 

router.get('/:nom', function(req, res){
    let nom = req.params.nom;
    res.status(200).render('front/membre.hbs', {
        nom: nom
    });
});

module.exports = router;