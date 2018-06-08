const express = require('express');
const router = express.Router(); 
const nodemailer = require('nodemailer');

const Visuel = require('../models/visuel');
const Article = require('../models/article');
const Prog = require('../models/prog');
const Logo = require('../models/logo');

// GET l'url, si = '/' alors affiche le fichier index.html
router.get('/', function(req, res){ 
    let visuels = {};
    let articles = {};
    let progs = {};
    let logos = {};
    Visuel.find({}, function(err, allvisuels){
        if(err) throw err;
        visuels = allvisuels;
    })
    Article.find({}, function(err, allarticles){
        if (err) throw err;
        articles = allarticles;
    })
    Prog.find({}, function(err, allprogs){
        if (err) throw err;
        progs = allprogs;
    })
    Logo.find({}, function(err, alllogos){
        if (err) throw err;
        logos = alllogos;
        res.render("front/index",{visuels:visuels, articles:articles, progs:progs, logos:logos, title:'Visual DNB'});
    })
    
});

// POST 
router.post('/', function(req, res){
    let nom = req.body.nom;
    let email = req.body.email;
    let logo = req.body.logo;
    let clipAudioReact = req.body.clipAudioReact;
    let bumper = req.body.Bumper;
    let clipVJ = req.body.clipVJ;
    let clipVideo = req.body.clipVideo;
    let scenographie = req.body.scenographie;
    let autre = req.body.autre;
    let message = req.body.message;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        port: 25,
        auth: {
            user : 'yellowaformac@gmail.com',
            pass : 'Snoopy87'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let HelperOptions = {
        from: nom,
        to: 'yellowaformac@gmail.com',
        subject: req.body.subject,
        text: "nom : " + nom + " / " + "Email : " + email + " / " + " Message : " + message
    }
    transporter.sendMail(HelperOptions, (error, info) => {
        if (error){
            console.log(error);
        }
        console.log('Message was sent');
        console.log(info);
    })
    res.redirect(req.get('referer'));
});

router.get('/:nom', function(req, res){
    let nom = req.params.nom;
    res.status(200).render('front/membre.hbs', {
        title: nom,
        nom: nom
    });
});


module.exports = router;