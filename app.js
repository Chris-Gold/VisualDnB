const fs = require('fs');

const renderHTML = function(template, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    fs.readFile(template, function(error, data){
        if(error){
            response.writeHead(404);
            response.write('template inexistant');
        }
        else{
            response.write(data);
        }
        response.end();
    })
}

const handleRequest = function(request, response){

    let path = request.url;

    switch(path){
        case '/':
            renderHTML('./index.html', response);
            break;
        default:
            renderHTML('./404.html', response);
    }

}

module.exports = {
    handleRequest : handleRequest
}