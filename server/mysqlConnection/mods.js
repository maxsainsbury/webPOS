const pool = require('./connection.js');
const {intToBool} = require("../helpers/helperFunctions");

const selectModsByCategory = async (categoryId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM mods WHERE category_id = ?',
            [categoryId]
        );
        for(let i = 0; i < results.length; i++) {
            results[i].is_available = intToBool(results[i].is_available[0]);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectModsByCategory }