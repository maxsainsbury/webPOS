const pool = require('./connection.js');
const {intToBool} = require("../helpers/helperFunctions");

const selectModsByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
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
        const [results] = await pool.query(
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
        const [results] = await pool.query(
            'SELECT * FROM mods WHERE mod_id = (SELECT mod_id FROM item_mod WHERE item_id = ? AND is_default = 1)',
            [itemId]
        )
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const addMod = async (mod) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO mods 
             (mod_name, category_id, is_available)
             VALUE (?, ?, ?)`,
            [mod.mod_name, mod.category_id, mod.is_available]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updateMod = async (mod) => {
    try {
        const [results] = await pool.query(
            `UPDATE mods
            SET mod_name = ?, category_id = ?, is_available = ? 
            WHERE mod_id = ?`,
            [mod.mod_name, mod.category_id, mod.is_available, mod.mod_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectModsByCategory, selectModsByItem, selectModsByItemDefault, addMod, updateMod };