const express = require('express');
const router = express.Router(); 

const Visuel = require('../models/visuel');
const Article = require('../models/article');
const Prog = require('../models/prog');
const Logo = require('../models/logo');

const multer = require('multer');
const storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'assets/img/')
	},
	filename: function(req,file,cb){
		cb(null, file.originalname);
 
	}
});
const upload = multer({ storage:storage });

router.get('/', function(req, res){
    res.status(200).render('back/login.hbs', {title: 'Connexion'});
});

router.post('/', function(req, res){
    let id = req.body.id;
    let mdp = req.body.mdp;
    console.log(id + ' ' + mdp);
});

router.get('/visuel', function(req, res){
    Visuel.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminVisuel", {visuels: results, title:'Visuel du site'});
    })
});


router.post('/visuel', function(req, res){
    Visuel.update({video: req.body.video, transition1: req.body.transition1, transition2: req.body.transition2, transition3: req.body.transition3}, function(err, numRowsAffected, rawResponse){
        if (err) throw err;
        res.redirect('/admin/visuel');
    })});
    
router.post('/uploadVisuel',upload.any(),function(req,res,next){
    console.log(req.files);
    res.redirect('/admin/visuel');
});

router.get('/prog', function(req, res){
    Prog.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminProg.hbs", {progs: results, title:'Programmé avec : '});
    })
});

router.post('/prog', function(req, res){
    let pg = new Prog();
    pg.url = req.body.url;
    pg.nom = req.body.nom;
    pg.save(function(err){
        if (err){
            res.render('back/adminProg.hbs', {title: "Administration", description: "Une erreur est survenue"});
        }
        res.render('back/adminProg.hbs', {title: "Administration", description: "Logo bien enregistré"});
    })
    function redirect() {
        window.location.assign("http://localhost:8000/admin/prog");
    }
});

router.post('/uploadProg',upload.any(),function(req,res,next){
    console.log(req.files);
    res.redirect('/admin/prog');
});

router.get('/delete-prog/:id', function(req, res){
    let progId = req.params.id;
    Prog.findByIdAndRemove(progId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})

router.get('/article', function(req, res){
    Article.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminArticle", {articles: results, title:'Article'});
    })
});

router.post('/article', function(req, res){
    let art = new Article();
    art.url = req.body.url;
    art.titre = req.body.titre;
    art.date = req.body.date;
    art.description = req.body.description;
    art.photos.url1 = req.body.url1;
    art.photos.url2 = req.body.url2;
    art.photos.url3 = req.body.url3;
    art.photos.url4 = req.body.url4;
    art.photos.url5 = req.body.url5;
    art.save(function(err){
        if (err){
            res.render('back/adminArticle.hbs', {title: "Administration", description: "Une erreur s'est produite"});
        }
        res.render('back/adminArticle.hbs', {title: "Administration", description: "new Article crée"});
    })
    function redirect() {
        window.location.assign("http://localhost:8000/admin/article");
    }
});

router.post('/uploadArticle',upload.any(),function(req,res,next){
    console.log(req.files);
    res.redirect('/admin/article');
});


router.get('/edit-article/:id', function(req, res){
    let articleId = req.params.id;
    Article.findById(articleId, function(err, result){
        if(err){
            throw err;
        }
        res.render("back/adminEditArticle", {article: result});
    })
});

router.post('/edit-article/:id', function(req, res){
    let articleId = req.params.id;
    Article.update({_id: articleId}, {url: req.body.url, titre: req.body.titre, date: req.body.date, description: req.body.description, photos: {url1: req.body.url1}}, function(err, numRowsAffected, rawResponse){
        if (err) throw err;
        res.redirect(req.get('referer'));
    })});

router.get('/delete-article/:id', function(req, res){
    let articleId = req.params.id;
    Article.findByIdAndRemove(articleId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})


router.get('/logo', function(req, res){
    Logo.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminLogo", {logos: results, title:'Logos'});
    })
});

router.post('/logo', function(req, res){
    let lo = new Logo();
    lo.url = req.body.url;
    lo.nom = req.body.nom;
    lo.save(function(err){
        if (err){
            res.render('back/adminLogo.hbs', {title: "Administration", description: "Une erreur est survenue"});
        }
        res.render('back/adminLogo.hbs', {title: "Administration", description: "Logo bien enregistré"});
    })
    function redirect() {
        window.location.assign("http://localhost:8000/admin/logo");
    }
});

router.get('/delete-logo/:id', function(req, res){
    let logoId = req.params.id;
    Logo.findByIdAndRemove(logoId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})

router.post('/uploadLogo',upload.any(),function(req,res,next){
    console.log(req.files);
    res.redirect('/admin/logo');
});


module.exports = router;