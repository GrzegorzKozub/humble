// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes
const fs = require('fs');
const server = require('https').createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});
server.on('request', (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end('Hello!\n');
});
server.listen(443);
