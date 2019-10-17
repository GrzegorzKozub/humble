const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();
const server = require('./todo-server')(client);

server.on('response', res => {
    console.log(res);
});

rl.on('line', input => {
    let cmd, args;
    [cmd, ...args] = input.split(' ');
    client.emit('command', cmd, args);
});
