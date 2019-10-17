const { Readable } = require('stream');

const inStream = new Readable({
    read() {
        setTimeout(() => {
            if (this.currentCharCode > 90) { // Z
                this.push(null); // finish
                return;
            }
            this.push(String.fromCharCode(this.currentCharCode++));
        }, 100);
    }
});

inStream.currentCharCode = 65; // A
inStream.pipe(process.stdout);

// node readable-stream.js | head -c3

process.on('exit', () => {
    console.error(`\ncurrentCharCode is ${inStream.currentCharCode}`);
});
process.stdout.on('error', process.exit);