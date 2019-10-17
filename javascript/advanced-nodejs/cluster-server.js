// ab -c200 -t10 http://localhost:8080/ | grep "Requests per second"
// got ~60

const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
    if (req.url === '/restart') {
        process.send('restart');
        res.end(`restart request handled by ${pid}`);
        return;
    }
    for (let i = 0; i < 1e7; i++);
    res.end(`handled by ${pid}`);
}).listen(8080, () => console.log(`started ${pid}`));

process.on('message', msg => console.log(`master told ${pid}: ${msg}`));

//setTimeout(() => process.exit(1), Math.random() * 60 * 1000);

