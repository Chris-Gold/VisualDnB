const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Visuel = require('../models/visuel');
const Article = require('../models/article');
const Prog = require('../models/prog');
const Logo = require('../models/logo');
const Audreact = require('../models/audreact');
const Bumpers = require('../models/bumpers');
const Vjing = require('../models/vjing');
const Membre = require('../models/membre');

// GET l'url, si = '/' alors affiche le fichier index.html
router.get('/', function (req, res){
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
    }).sort({_id:-1})

    Prog.find({}, function(err, allprogs){
        if (err) throw err;
        progs = allprogs;
    })

    Audreact.find(function(err, allaudreacts){
        if(err)throw err;
        audreacts = allaudreacts;
    })

    Bumpers.find(function(err, allbumpers){
        if(err)throw err;
        bumpers = allbumpers;
    })

    Vjing.find(function(err, allvjings){
        if(err)throw err;
        vjings = allvjings;
    })

    Membre.find(function(err, allmembres){
        if(err)throw err;
        membres = allmembres;
    })

    Logo.find({}, function(err, alllogos){
        if (err) throw err;
        logos = alllogos;
        res.render("front/index", {
          visuels:visuels,
          articles:articles,
          progs:progs,
          logos:logos,
          audreacts:audreacts,
          bumpers:bumpers,
          vjings:vjings,
          membres:membres,
          title:'Visual DNB'
        });
    })
});

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

router.get('/article/:id', function(req, res){
    let articleId = req.params.id;
    if (articleId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        Article.findById(articleId, function (err, result){
            if (err) throw err;
            res.status(200).render('front/article.hbs', {
                article:result,
                title: 'Article'
            });
      });
    };
});

router.get('/membres/:nom', function(req, res){
    let nom = req.params.nom;
    res.status(200).render('front/membre.hbs', {
        title: nom,
        nom: nom
    });
});

module.exports = router;