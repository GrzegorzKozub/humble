var AWS = require('aws-sdk');
//var credentials = {
  //accessKeyId: '',
  //secretAccessKey: ''
//};
AWS.config.update({
  //credentials: credentials,
  region: 'eu-west-1'
});

var s3 = new AWS.S3();

//var put = s3.getSignedUrl('putObject', {
  //Bucket: 'greg',
  //Key: 'foo.txt',
  //ContentType: 'text/plain',
  //Expires: 600
//});
//console.log(put);

var post = s3.createPresignedPost({
  Bucket: 'greg',
  Fields: {
    key: 'foo.txt'
  }
});
console.log(post);

var request = require('request');
var fs = require('fs');
var options = {
  'method': 'POST',
  'url': `https://s3.eu-west-1.amazonaws.com/${post.fields.bucket}`,
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  formData: {
    'key': post.fields.key,
    'bucket': post.fields.bucket,
    'X-Amz-Algorithm': post.fields['X-Amz-Algorithm'],
    'X-Amz-Credential': post.fields['X-Amz-Credential'],
    'X-Amz-Date': post.fields['X-Amz-Date'],
    'Policy': post.fields.Policy,
    'X-Amz-Signature': post.fields['X-Amz-Signature'],
    'file': {
      'value': fs.createReadStream('foo.txt'),
      'options': {
        'filename': 'foo.txt',
        'contentType': null
      }
    }
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.status);
});

