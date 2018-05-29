const express = require('express'); // On utilise le framework Express pour Nodejs
const path = require('path'); // Module fourni avec express pour les chemins. (Pour utiliser "join")
const bodyParser = require('body-parser'); // Permet d'utiliser la method post data

const indexRoutes = require('./routes/index.js'); // "importe" les routes de l'index.hbs
const errorRoutes = require('./routes/404.js'); // idem qu'au dessus pour la page 404

const app = express(); // Initialisation de l'application express

app.use(bodyParser.urlencoded({extended: false})); // A utiliser pour post les data du form

app.set('view engine', 'hbs'); // On défini le moteur de vue comme étant handlebars
app.set('views', path.join(__dirname, 'views')); // On implémente au chemin courant le dossier views

app.use(express.static(__dirname + '/assets')); // On dit que assets contient les fichiers statics
// __dirname permet de récupérer l'url d'où on est à partir de la racine

// Declaration de nos routes maintenant à leurs place dans le dossier routes
app.use('/', indexRoutes);
app.use('*', errorRoutes);

app.listen(8000); // On écoute sur le port 8000