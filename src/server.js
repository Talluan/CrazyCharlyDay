const http = require('http');
const express = require('express');
const fs = require("fs");
const { Server } = require("socket.io");
const { Sequelize, DataTypes } = require('@sequelize/core');
const { exit } = require('process');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sequelize = null;
fs.readFile(__dirname+"/conf/conf.json", (err, data) => {
    const info = JSON.parse(data);
    const bdd = new Sequelize(info.bddName, info.login, info.password, {
        host: info.host,
        dialect: "mysql",
        port: info.port
    });
    bdd.authenticate()
    .then(v => console.log("Connected to database !"))
    .catch(v => console.log("Error connecting to database: "+v))
    .finally(() => {sequelize = bdd;});
});

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
})

server.listen(443);