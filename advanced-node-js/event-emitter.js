const EventEmitter = require('events');
const fs = require('fs');

class MyClass extends EventEmitter {
    doStuff(asyncFunc, ...args) {
        console.time('doStuff');
        this.emit('begin');
        asyncFunc(...args, (err, data) => {
            if (err) this.emit('error', err);
            this.emit('data', data);
        });
        console.timeEnd('doStuff');
        this.emit('end');
    }
}

const myClass = new MyClass();

myClass.on('begin', () => console.log('doStuff: begin'));
myClass.on('end', () => console.log('doStuff: end'));

myClass.on('data', data => console.log(`doStuff: ${data}`));

myClass.once('error', err => {
    // called once, even if there's many errors
    // best practice: clean-up and exit
    console.error(err);
    process.exit(1);
});

myClass.doStuff(fs.readFile, './data.json');
