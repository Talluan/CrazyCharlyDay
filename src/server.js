const https = require('https');
const express = require('express');
const fs = require("fs");
const { Server } = require("socket.io");
const bdd = require("./server/Bdd");

// base de donnee
bdd.init().then(() => {
    console.log("Module BDD initialise");
});

// redirection de http vers https
require('http').createServer((req, res) => {
    res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
    res.end();
}).listen(80);

let credentials = {
    key: fs.readFileSync("./credentials/key.pem", "utf-8"),
    cert: fs.readFileSync("./credentials/cert.pem", "utf-8")
};

const app = express();
const server = https.createServer(credentials, app);
const io = new Server(server);

app.get('/*', (req, res) => {
    let path = req.url;
    if (req.url == "/") path = "/index.html";
    path = path.split("?")[0];
    path = __dirname+"/client"+path;
    res.sendFile(path);
});

io.on("connection", socket => {
    console.log("new connection from socket "+socket.id);
    socket.on("disconnect", r => {
        console.log("socket "+socket.id+" disconnected: "+r);
    });
});

server.listen(443);