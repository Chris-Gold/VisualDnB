const express = require('express');
const router = express.Router(); 

// Ici '*' prend comme valeur une url inconnue à celles déjà déclarées ici
router.get('*', function(req, res){
    res.status(404).render('404.hbs'); // Renvoie page erreur 404
});

module.exports = router;