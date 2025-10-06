const pool = require('./connection.js');
const {intToBool} = require("../helpers/helperFunctions");

const selectModsByCategory = async (categoryId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM mods WHERE category_id = ?',
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

const selectModsByItem = async (itemId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM mods WHERE mod_id = (SELECT mod_id FROM item_mod WHERE item_id = ?)',
            [itemId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const selectModsByItemDefault = async (itemId) => {
    try {
        const [results, fields] = await pool.query(
            'SELECT * FROM mods WHERE mods_id = (SELECT mod_id FROM item_mod WHERE item_id = ? AND is_default = 1)',
            [itemId]
        )
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectModsByCategory, selectModsByItem, selectModsByItemDefault };