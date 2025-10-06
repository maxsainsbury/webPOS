const mysql = require('mysql2/promise');

//create a pool connection to the mySQL server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'webPOS_DB',
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