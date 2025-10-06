const pool = require('./connection.js');

//function to search for a price by the category id
const selectPriceByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM prices WHERE price_id = (SELECT price_id FROM categories WHERE category_id = ?)',
            [categoryId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {selectPriceByCategory};