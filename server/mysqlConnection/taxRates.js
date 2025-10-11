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

const addTaxRate = async (taxRate) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO tax_rates
            (tax_name, tax_rate)
            VALUES (?, ?)`,
            [taxRate.tax_name, taxRate.tax_rate]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updateTaxRate = async (taxRate) => {
    try {
        const [results] = await pool.query(
            `UPDATE tax_rates
            SET tax_name = ?, tax_rate = ? 
            WHERE tax_id = ?`,
            [taxRate.tax_name, taxRate.tax_rate, taxRate.tax_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectTaxRateByCategory, addTaxRate, updateTaxRate };