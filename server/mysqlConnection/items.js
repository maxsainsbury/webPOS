const pool = require('./connection.js');
const {intToBool, boolToInt} = require('../helpers/helperFunctions.js');

//function to select all items related by a category
const selectItemsByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
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

//function to select an item by the item id
const selectItemById = async (itemId) => {
    try {
        const [results] = await pool.query(
            `SELECT *
             FROM items i INNER JOIN categories c USING(category_id)
             INNER JOIN tax_rates t ON(c.tax_id = t.tax_id)
             INNER JOIN prices p ON(c.price_id = p.price_id)
             WHERE item_id = 2`,
            [itemId]
        );
        results[0].is_available = intToBool(results[0].is_available[0]);
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to add an item to the database
const addItem = async (item) => {
    try {
        item.is_available = boolToInt(item.is_available);
        const [results] = await pool.query(
            `INSERT INTO items (item_name, category_id, is_available)
             VALUES (?, ?, ?)`,
            [item.name, item.category_id, item.is_available]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to update a item in the database
const updateItem = async (item) => {
    try {
        item.is_available = boolToInt(item.is_available);
        const [results] = await pool.query(
            `UPDATE items 
             SET item_name = ?, category_id = ?, is_available = ?
             WHERE item_id = ?`,
            [item.item_name, item.category_id, item.is_available, item.item_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//export all functions
module.exports = {selectItemsByCategory, selectItemById, addItem, updateItem };