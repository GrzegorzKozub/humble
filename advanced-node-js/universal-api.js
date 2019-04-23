const fs = require('fs');

// callback and promise universal function
const countLines = (file, cb = () => {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err); // promise
                return cb(err); // callback
            }
            const count = data.toString().trim().split('\n').length;
            resolve(count); // promise
            return cb(null, count); // callback
        });
    });
}

const file = './data.json';

// callback call
countLines(file, (err, data) => {
    if (err) console.log(err);
    console.log(data);
});

// promise call
countLines(file).then(console.log).catch(console.error);

// below requires --harmony-asyc-await

// async wrapper
async function countLinesAsync() {
    try {
        console.log(await countLines(file));
    } catch (err) {
        console.error(err);
    }
}

// async call
countLinesAsync();
