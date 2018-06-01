const express = require('express');
const router = express.Router(); 

router.get('/admin', function(req, res){
    res.status(200).render('back/index.hbs');
});

module.exports = router;