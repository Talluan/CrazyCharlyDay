const https = require('https');
const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const bodyParser = require("body-parser");
const fs = require("fs");
const { Server } = require("socket.io");
const bdd = require("./server/Bdd");

// base de donnee
bdd.init().then(() => {
    require("./server/Models").init();
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

app.use(session({
    secret: process.env.secret,
    saveUninitialized: false,
    resave: false,
    cookie: {secure: false}
}));
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const server = https.createServer(credentials, app);
const io = new Server(server);
require("./server/routes.js")(app);
app.get('/test', (req, res) => {
    // console.log(req.cookies['test']);
    // res.cookie('test', 'test');
    console.log(req.cookies['test']);
    req.session.test = 'oui';
    console.log(req.session.userid);
    res.send('ok');
});
app.get('/*', (req, res) => {
    console.log(req.session.test);
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