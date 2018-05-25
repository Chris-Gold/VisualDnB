const express = require('express');
const router = express.Router(); 

// ROUTES BACK
// Si l'url indique admin alors on affiche la page login
router.get('/admin', function(req, res){
    res.status(200).render('back/login.hbs');
});

// POST BACK
router.post('/admin', function(req, res){
    let id = req.body.id;
    let mdp = req.body.mdp;
    res.send(id + ' ' + mdp);
});

module.exports = router;