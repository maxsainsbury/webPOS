const pool = require('./connection.js');

const selectPriceByCategory = async (categoryId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM prices WHERE price_id = (SELECT price_id FROM price_category WHERE category_id = ?)',
            [categoryId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {selectPriceByCategory};