const pool = require('./connection.js');

const selectTaxRateByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM tax_rates WHERE category_id = ?`,
            [categoryId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectTaxRateByCategory };