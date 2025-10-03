const mysql = require('mysql2/promise');
const pool = require('./connection.js');

const selectItems = async () => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM `items`'
        );

        console.log(results);
        console.log(fields);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {selectItems};