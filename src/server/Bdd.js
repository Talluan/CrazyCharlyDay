const { Sequelize } = require('@sequelize/core');
const fs = require("fs");
const FALSE = 1;
const WAIT = 2;
const TRUE = 3;
let initialised = FALSE;

/**@type {Sequelize} */
let bdd = null;

module.exports = {
    setBdd,
    getBdd,
    init
}

function getBdd() {
    if (initialised != TRUE) init();
    return bdd;
}

function setBdd(val) {
    bdd = val;
}

function init() {
    return new Promise((resolve, reject) => {
        if (initialised == TRUE) {
            resolve();
            return;
        }
        fs.readFile(__dirname+"/../conf/conf.json", (err, data) => {
            const info = JSON.parse(data);
            const bdd = new Sequelize(info.bddName, info.login, info.password, {
                host: info.host,
                dialect: "mysql",
                port: info.port
            });
            bdd.authenticate()
            .then(v => {
                console.log("Connected to database !");
                setBdd(bdd);
                initialised = TRUE;
                resolve();
            }).catch(v => {
                console.log("Error connecting to database: "+v);
                reject(v);
                initialised = FALSE;
            });
        });
    });
}