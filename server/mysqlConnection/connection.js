const mysql = require('mysql2/promise');
const config = require('../config.json');
const database = config.database;

//extract data from config file
const {host, port, user, password, name} = database;

//create a pool connection to the mySQL server
const pool = mysql.createPool({
    host: host,
    port: port,
    user: user,
    password: password,
    database: name,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

//export for use throughout all mySQL files
module.exports = pool;