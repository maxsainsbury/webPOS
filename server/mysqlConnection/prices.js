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

const addPrice = async (price) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO prices (price)
             VALUES (?);`,
            [price.price]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updatePrice = async (price) => {
    try {
        const [results] = await pool.query(
            `UPDATE prices
            SET price = ?
            WHERE price_id = ?`,
            [price.price, price.price_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectPriceByCategory, addPrice, updatePrice };