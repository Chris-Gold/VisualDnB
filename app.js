const express = require('express'); // On utilise le framework Express pour Nodejs
const app = express();


app.use(express.static(__dirname + '/assets')); // On dit que assets contient les fichiers statics. 
// __dirname permet de récupérer l'url d'où on est à partir de la racine.

// On get l'url, si = '/' alors affiche le fichier index.html
app.get('/', function(req, res){ 
    res.status(200).sendFile(__dirname + '/index.html'); // (Les status sont visibles dans le network)
});
// Ici '*' prend comme valeur une url inconnue à celles déjà déclarées ici
app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(8000); // On écoute sur le port 8000