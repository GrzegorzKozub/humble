const app = require('http');
const fs = require('fs');
const port = Number(process.env.PORT || 80);

app.createServer((req, res) => {
    fs.readFile(__dirname + req['url'], (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end();
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(port, () => console.log(`listening on ${port}`));
