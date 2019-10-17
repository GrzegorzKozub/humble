const https = require('https');

const inspect = response => {
    console.log(response.statusCode);
    console.log(response.headers);
    response.on('data', data => console.log(data.toString()));
}

const request = https.request({
    hostname: 'www.google.com'
}, inspect);
request.on('error', console.error);
request.end();

const get = https.get('https://www.google.com', inspect);
get.on('error', console.error);
