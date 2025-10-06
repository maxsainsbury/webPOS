const pool = require('./connection.js');

//function to search for a tax rate by the category id
const selectTaxRateByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM tax_rates WHERE tax_id = (SELECT * FROM categories WHERE category_id = ?)`,
            [categoryId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectTaxRateByCategory };