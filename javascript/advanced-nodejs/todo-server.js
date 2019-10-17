const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.tasks = {};
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Awaiting command');
        });
        client.on('command', (cmd, args) => {
            switch (cmd) {
                case 'help':
                case 'add':
                case 'delete':
                case 'ls':
                case 'quit':
                    this[cmd](args);
                    break;
                default:
                    this.emit('response', 'Dunno this one. Try help');
            }
        });
    }

    tasksString() {
        const keys = Object.keys(this.tasks);
        if (keys.length === 0) return 'No tasks';
        return keys
            .map(key => `${key}: ${this.tasks[key]}`)
            .join('\n');
    }

    help() {
        this.emit('response', 'Available commands: help, add <task-desc>, delete <task-id>, ls, quit');
    }

    add(args) {
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Task ${this.taskId} created`);
        this.taskId++;
    }

    delete(args) {
        delete(this.tasks[args[0]]);
        this.emit('response', `Task ${args[0]} removed`);
    }

    ls() {
        this.emit('response', this.tasksString());
    }

    quit() {
        process.exit(0);
    }
}

module.exports = client => new Server(client);
