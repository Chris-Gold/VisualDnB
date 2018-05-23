const express = require('express'); // On utilise le framework Express pour Nodejs
const path = require('path'); // Module fourni avec express pour les chemins. (Pour utiliser "join")

const app = express();



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/assets')); // On dit que assets contient les fichiers statics. 
// __dirname permet de récupérer l'url d'où on est à partir de la racine.

// On get l'url, si = '/' alors affiche le fichier index.html
app.get('/', function(req, res){ 
    res.status(200).render('index.hbs'); // (Les status sont visibles dans le network)
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