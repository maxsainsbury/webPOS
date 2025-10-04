const pool = require('./connection.js');
const {intToBool} = require('../helpers/helperFunctions.js');


const selectItemsByCategory = async (categoryId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM `items` WHERE `category_id`=?',
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

const selectItemById = async (itemId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM `items` WHERE `id`=?',
            [itemId]
        );
        results[0].is_available = intToBool(results[0].is_available[0]);
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

const addItem = async (item) => {
    try {
        const [results, fields] = await pool.query(
            'INSERT INTO `items` (name, category_id, price, tax_id)' +
            'VALUES (?, ?, ?, ?, ?)',
            [item.name, item.categoryId, item.price, item.taxId]
        );
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {selectItemsByCategory, selectItemById};