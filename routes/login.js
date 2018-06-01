const express = require('express');
const router = express.Router(); 

router.get('/', function(req, res){
    res.status(200).render('back/login.hbs');
});

router.post('/login', function(req, res){
    let id = req.body.id;
    let mdp = req.body.mdp;
    console.log(id + ' ' + mdp);
});


module.exports = router;