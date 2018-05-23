const express = require('express'); // On utilise le framework Express pour Nodejs
const path = require('path'); // Module fourni avec express pour les chemins. (Pour utiliser "join")
const bodyParser = require('body-parser'); // Permet d'utiliser la method post data

const app = express(); // Initialisation de l'application express
let formInfo = []; // Stockage des données inscrites dans le formulaire contact

app.use(bodyParser.urlencoded({extended: true})); // A utiliser pour post les data du form

app.set('view engine', 'hbs'); // On défini le moteur de vue comme étant handlebars
app.set('views', path.join(__dirname, 'views')); // On implémente au chemin courant le dossier views.

app.use(express.static(__dirname + '/assets')); // On dit que assets contient les fichiers statics. 
// __dirname permet de récupérer l'url d'où on est à partir de la racine.

// On get l'url, si = '/' alors affiche le fichier index.html
app.get('/', function(req, res){ 
    res.status(200).render('index.hbs'); // (Les status sont visibles dans le network)
});

app.post('/', function(req, res){
    let nom = req.body.nom;
    let email = req.body.email;
    let siteWeb = req.body.siteWeb;
    let message = req.body.message;
    res.send(nom + ' ' + email + ' ' + siteWeb + ' ' + message);
});

// Permet d'avoir un template identique pour tous les produits.
// Ce qu'il y a après les ":" est variable
// Recupére le paramètre "nameProduct" dans l'url.
// app.get('/product/:nameProduct', function(req, res){
//     res.status(200).send('Ceci est la page produit de : ' + req.params.nameProduct);
// });

// Ici '*' prend comme valeur une url inconnue à celles déjà déclarées ici
app.get('*', function(req, res){
    res.status(404).render('404.hbs'); // Renvoie page erreur 404
});

app.listen(8000); // On écoute sur le port 8000