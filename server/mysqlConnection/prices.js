const pool = require('./connection.js');

const selectPriceByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM prices WHERE category_id = ?',
            [categoryId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {selectPriceByCategory};