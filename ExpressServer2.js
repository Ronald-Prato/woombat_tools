'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const directoryToServe = 'build';
const  port = 5000;

app.use('/', express.static(path.join(__dirname, directoryToServe)));

const httpsOP ={
    cert: fs.readFileSync('/opt/cloudera/security/pki/agent.cert.pem'),
    key: fs.readFileSync('/opt/cloudera/security/pki/agent.d.key')
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
https.createServer(httpsOP,app).listen(port,() => {
    console.log("Server Working on",port)
});

/*
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(4501);
app.listen(port,() =>{
    console.log('server on port',port);
});

*/
