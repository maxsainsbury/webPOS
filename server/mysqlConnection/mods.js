const pool = require('./connection.js');
const {intToBool, boolToInt} = require("../helpers/helperFunctions");

//function to search for mods by related category
const selectModsByCategory = async (categoryId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM mods WHERE category_id = ?',
            [categoryId]
        );
        //for all returned mods change is_availabe variable from tinyint to boolean
        for(let i = 0; i < results.length; i++) {
            results[i].is_available = intToBool(results[i].is_available[0]);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for mods by related item
const selectModsByItem = async (itemId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM mods WHERE mod_id = (SELECT mod_id FROM item_mod WHERE item_id = ?)',
            [itemId]
        );
        //for all returned mods change is_availabe variable from tinyint to boolean
        for(let i = 0; i < results.length; i++) {
            results[i].is_available = intToBool(results[i].is_available[0]);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for mods by if their default on the item
const selectModsByItemDefault = async (itemId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM mods WHERE mod_id = (SELECT mod_id FROM item_mod WHERE item_id = ? AND is_default = 1)',
            [itemId]
        )
        //for all returned mods change is_availabe variable from tinyint to boolean
        for(let i = 0; i < results.length; i++) {
            results[i].is_available = intToBool(results[i].is_available[0]);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for mods by mod id
const selectModsById = async (modId) => {
    try {
        const [results] = await pool.query(
            `SELECT * 
             FROM mods INNER JOIN categories c USING(category_id)
             INNER JOIN tax_rates USING(tax_id)
             INNER JOIN prices p ON(c.price_id = p.price_id)
             WHERE mod_id = ?`,
            [modId]
        );
        results[0].is_available = intToBool(results[0].is_available[0]);
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

//function to add a mod to the database
const addMod = async (mod) => {
    try {
        //change is_available variable into an integer
        mod.is_available = boolToInt(mod.is_available);
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

//function to update a mod in the database
const updateMod = async (mod) => {
    try {
        //change is_available variable into an integer
        mod.is_available = boolToInt(mod.is_available);
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

module.exports = { selectModsByCategory, selectModsByItem, selectModsByItemDefault, selectModsById, addMod, updateMod };