const express = require('express'); // On utilise le framework Express pour Nodejs
const path = require('path'); // Module fourni avec express pour les chemins. (Pour utiliser "join")
const bodyParser = require('body-parser'); // Permet d'utiliser la method post data
const BlogPost = require('./models/blogpost.js'); // On import le model (Schema mongoose) des post
const mongoose = require('mongoose');

// Routes
const indexRoute = require('./routes/index.js'); // "importe" les routes de l'index.hbs
const allArticlesRoute = require('./routes/all-articles.js');
const membreRoute = require('./routes/membre.js');
const loginRoute = require('./routes/login.js');
const adminRoute = require('./routes/admin.js');
const errorRoute = require('./routes/404.js'); 

// Init app Express
const app = express(); 

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/visualdnb');

// View Engine
app.set('views', path.join(__dirname, 'views')); // On implémente au chemin courant le dossier views
app.set('view engine', 'hbs'); // On défini le moteur de vue comme étant handlebars

// BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Static Folder
app.use(express.static(__dirname + '/assets')); // On dit que assets contient les fichiers statics
// __dirname permet de récupérer l'url d'où on est à partir de la racine

// Declaration de nos routes maintenant à leurs place dans le dossier routes
app.use('/all-articles', allArticlesRoute);
app.use('/membre', membreRoute);
app.use('/login', loginRoute);
app.use('/admin', adminRoute);
app.use('/', indexRoute);
app.use('*', errorRoute);

app.listen(8000); // On écoute sur le port 8000