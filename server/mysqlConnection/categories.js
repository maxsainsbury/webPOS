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

//function to add a category
const addCategory = async (category) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO categories (category_name, tax_id, price_id)
             VALUES (?, ?, ?)`,
            [category.category_name, category.tax_id, category.price_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to update a category
const updateCategory = async (category) => {
    try {
        const [results] = await pool.query(
            `UPDATE categories
            SET category_name = ?, tax_id = ?, price_id = ? 
            WHERE category_id = ?`,
            [category.category_name, category.tax_id, category.price_id, category.category_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//export function
module.exports = { selectCategory, addCategory, updateCategory };