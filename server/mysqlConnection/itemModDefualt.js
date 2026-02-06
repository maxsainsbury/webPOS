const pool = require('connection.js');

//add defualt mods to item
const addItemModDefault = async (itemModDefault) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO item_mod_default
            (item_id, mod_id)
            VALUES (?, ?)`,
            [itemModDefault.item_id, itemModDefault.mod_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//Remove a default mod to item
const deleteItemModDefault = async (itemModDefault) => {
    try {
        const [results] = await pool.query(
            `DELETE FROM item_mod_default
            WHERE item_id = ? AND mod_id = ?`,
            [itemModDefault.item_id, itemModDefault.mod_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}