const express = require('express');
const app = express();


app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
    res.status(200).sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res){
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(8000);