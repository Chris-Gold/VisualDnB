const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.status(200).send("Salut ceci est la page d'acceuil");
});

app.get('*', function(req, res){
    res.status(404).send("Erreur 404");
});

app.listen(8000);