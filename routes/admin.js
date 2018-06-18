const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const url = require('url');

const Visuel = require('../models/visuel');
const Article = require('../models/article');
const Prog = require('../models/prog');
const Logo = require('../models/logo');
const User = require('../models/user');
const Media = require('../models/media');

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
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username}, function(err, user){
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(404).send();
        }

        user.comparePassword(password, function(err, isMatch){
            if (isMatch && isMatch == true){
                req.session.user = user;
                return res.redirect('/admin/visuel');
            } else {
                return res.status(401).send("Mauvais mot de passe.");
            }
        });
    });
});

router.get('/se-deconnecter', function(req, res){
    req.session.destroy();
    return res.redirect('/admin');
})

// router.post('/register', function(req, res){
//     let username = req.body.username;
//     let password = req.body.password;
//
//     let newuser = new User();
//     newuser.username = username;
//     newuser.password = password;
//     newuser.save(function(err, savedUser){
//         if (err) {
//             console.log(err);
//             return res.status(500).send();
//         }
//         return res.status(200).send();
//     })
// });

router.get('/visuel', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
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

router.get('/prog', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
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

router.get('/delete-prog/:id', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    let progId = req.params.id;
    Prog.findByIdAndRemove(progId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})

router.get('/article', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    Article.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminArticle", {articles: results, title:'Article'});
    }).sort({_id:-1})
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
    art.photos.url6 = req.body.url6;
    art.photos.url6 = req.body.url6;
    art.photos.url7 = req.body.url7;
    art.photos.url8 = req.body.url8;
    art.photos.url9 = req.body.url9;
    art.photos.url10 = req.body.url10;
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
    let filenames = req.files.map(function(file) {
        return file.filename; // or file.originalname
      });
    console.log(filenames);
    res.redirect('/admin/article');
});


router.get('/edit-article/:id', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
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
    Article.update({_id: articleId}, {url: req.body.url, titre: req.body.titre, date: req.body.date, description: req.body.description, photos: {url1: req.body.url1, url2: req.body.url2, url3: req.body.url3, url4: req.body.url4, url5: req.body.url5}}, function(err, numRowsAffected, rawResponse){
        if (err) throw err;
        res.redirect(req.get('referer'));
    })
});

router.get('/delete-article/:id', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    let articleId = req.params.id;
    Article.findByIdAndRemove(articleId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})

router.get('/logo', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
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
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    let logoId = req.params.id;
    Logo.findByIdAndRemove(logoId, function(err){
        if(err){
            throw err;
        }
        res.redirect(req.get('referer'));
    })
})

router.get('/media', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    Media.find(function(err, results){
        if(err){
            throw err;
        }
        res.render("back/adminMedia.hbs", {medias: results, title:'Media'});
    })
});

router.post('/media',upload.any(),function(req,res,next){
    let me = new Media();
    me.filename = req.files.map(function(file) {
        return file.filename; // or file.originalname
      });
    me.save(function(err){
        if (err){
            res.render('back/adminMedia.hbs', {title: "Media", description: "Une erreur est survenue"});
        }
        res.render('back/adminMedia.hbs', {title: "Media", description: "Media bien enregistré"});
    })
    function redirect() {
        window.location.assign("http://localhost:8000/admin/media");
    }
});

router.get('/delete-media/:filename/:id', function(req, res){
    if(!req.session.user){
        return res.status(401).send("Êtes vous sûr d'être enregistrés ?");
    }
    let mediaID = req.params.id;
    let mediaFilename = req.params.filename;
    Media.findByIdAndRemove(mediaID, function(err){
        if(err){
            throw err;
        }
        fs.unlink('./assets/img/' + mediaFilename, function (err){
            if (err) throw err;
            res.redirect(req.get('referer'));
        })
    })
})

module.exports = router;
