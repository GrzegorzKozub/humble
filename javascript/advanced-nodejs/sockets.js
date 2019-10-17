const server = require('net').createServer();

let counter = 0;
const sockets = {};

server.on('connection', socket => {
    socket.id = counter++;

    console.log(`client ${socket.id} connected`);
    socket.write('Type yer name: ');

    socket.on('data', data => {
        console.log(`client ${socket.id} sent:`, data); // data is a raw buffer

        if (!sockets[socket.id]) {
            sockets[socket.id] = socket;
            socket.name = data.toString().trim();
            socket.write(`hello, ${socket.name}\n`);
            return;
        }

        Object.entries(sockets).forEach(([, client]) => {
            if (client.id === socket.id) return;
            client.write(`${socket.name}: ${data}`); // write encodes in utf8 by default
        });
    });

    const sayBye = () => {
        delete(sockets[socket.id]);
        console.log(`client ${socket.id} is gone`);
    }

    socket.on('end', sayBye);
    socket.on('error', sayBye);
});

const port = 8000;
server.listen(port, () => console.log(`listening on ${port}`));
