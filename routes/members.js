const express = require('express');
const router = express.Router(); 

// Si l'url est celle d'un membre, affiche sa page.
router.get('/:member', function(req, res){
    const member = req.params.member;
    res.status(200).render('front/member.hbs', {
        member: member
    });
});

module.exports = router;