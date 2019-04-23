const { spawn } = require('child_process');

const ls = spawn('ls', ['--color', '-a']);
const wc = spawn('wc', ['-w']);

ls.stdout.pipe(wc.stdin);

ls.stdout.on('data', data => console.log(`ls stdout:\n${data}`));
wc.stdout.on('data', data => console.log(`wc stdout:\n${data}`));

ls.stderr.on('data', data => console.error(`ls stderr:\n${data}`));

ls.on('exit', (code, signal) => {
    console.log(`ls exited with code ${code} and signal ${signal}`);
});

