const http = require('http');
const app = require('./app');

console.log(app);

http.createServer(app.handleRequest).listen(8000);