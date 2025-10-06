const pool = require('./connection.js');

const selectCategory = async () => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM categories`
        );
        console.log(results);
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectCategory };