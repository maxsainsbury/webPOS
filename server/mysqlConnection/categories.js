const pool = require('./connection.js');

//function to select all categories from database
const selectCategory = async () => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM categories`
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//export function
module.exports = { selectCategory };