const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile('./index.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write('Erreur 404');
        }
        else{
            res.write(data);
        }
        res.end();
    });

}).listen(8000);