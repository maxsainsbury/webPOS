const pool = require('./connection.js');
const {intToBool, boolToInt} = require('../helpers/helperFunctions.js');

//function to search for a order by the id
const selectOrderById = async (orderId) => {
    console.log(orderId);
    try {
        let order = await pool.query(
            `SELECT * FROM orders WHERE order_id = ?`,
            [orderId]
        );
        order = order[0];
        order.is_future_order = intToBool(order.is_future_order);
        order.in_use = intToBool(order.in_use);
        let items = await pool.query(
            `SELECT * FROM order_items WHERE order_id = ?`,
            [orderId]
        );
        items = items[0];
        for(let i = 0; i < items.length; i++) {
            let mods = await pool.query(
                `SELECT * FROM webpos_db.order_items_mods WHERE order_items_id = ?`,
                [items[i].order_items_id]
            );
        }
        const mods = []
        let results = {
            order: order,
            items: items,
            mods: mods
        }
        console.log(results);
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for all orders related to a customer
const selectOrdersByCustomer = async (customerId) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM orders WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_id = ?)`,
            [customerId]
        );
        for(let i = 0; i < results.length; i++) {
            results[i].is_future_order = intToBool(results[i].is_future_order);
            results[i].in_use = intToBool(results[i].in_use);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for all orders scheduled on a specific date
const selectOrdersByDate = async (date) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM orders WHERE scheduled_date = ?`,
            [date]
        );
        for(let i = 0; i < results.length; i++) {
            results[i].is_future_order = intToBool(results[i].is_future_order);
            results[i].in_use = intToBool(results[i].in_use);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to search for orders depending on their payment status
const selectOrdersByPaymentStatus = async (paymentStatus) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM orders WHERE payment_status = ?`,
            [paymentStatus]
        );
        for(let i = 0; i < results.length; i++) {
            results[i].is_future_order = intToBool(results[i].is_future_order);
            results[i].in_use = intToBool(results[i].in_use);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to add a order to the database
const addOrder = async (fullOrder) => {
    try {
        const {order, items} = fullOrder;
        order.is_future_order = boolToInt(order.is_future_order);
        order.in_use = boolToInt(order.in_use);
        const [orderResults] = await pool.query(
            `INSERT INTO orders 
            (customer_id, user_id, order_number, order_type, order_status, is_future_order, scheduled_date, scheduled_time, subtotal, tax_amount, payment_status, special_instructions)
            VALUE (?, ?, ?, ?, 'Scheduled', ?, ?, ?, ?, ?, ?, ?)`,
            [order.customer_id, order.user_id, order.order_number, order.order_type, order.is_future_order, order.scheduled_date, order.scheduled_time, order.subtotal, order.tax_amount, order.payment_status. order.special_instructions]
        );
        const [orderItemResults] = await pool.query(
            `INSERT INTO order_items
            (order_id, item_id, quantity)
            VALUE (?, ?, ?)`,
            [order.order_id, items.item_id, items.quantity]
        )
        return {order: orderResults, items: orderItemResults};
    } catch (error) {
        console.log(error.message);
    }
}

//function to update an order in the database
const updateOrder = async (fullOrder) => {
    try {
        const {order, items} = fullOrder;
        order.is_future_order = boolToInt(order.is_future_order);
        order.in_use = boolToInt(order.in_use);
        const [orderResults] = await pool.query(
            `UPDATE orders
            SET customer_id = ?, user_id = ?, order_number = ?, order_type = ?, order_status = ?, is_future_order = ?, scheduled_date = ?, scheduled_time = ?, subtotal = ?, tax_amount = ?, tip_amount = ?, payment_status = ?, special_instructions = ?
            WHERE order_id = ?`,
            [order.customer_id, order.user_id, order.order_number, order.order_type, order.order_status, order.is_future_order, order.scheduled_date, order.scheduled_time, order.subtotal, order.tax_amount, order.tip_amount, order.payment_status, order.special_instructions, order.order_id]
        );
        const [orderItemResults] = await pool.query(
            `UPDATE order_items
            SET item_id=?, quantity=?
            WHERE order_id=?`,
            [items.item_id, items.quantity, order.order_id]
        )
        return {order: orderResults, items: orderItemResults};
    } catch (error) {
        console.log(error.message);
    }
}

const getOrderTypes = async () => {
    try {
        const [results] = await pool.query (
            `SELECT COLUMN_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = 'webpos_db'
                AND TABLE_NAME = 'orders'
                AND COLUMN_NAME = 'order_type'`
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updateInUse = async (orderId, inUseStatus) => {
    try {
        inUseStatus = boolToInt(inUseStatus);
        const [results] = await pool.query (
            `UPDATE orders
            SET in_use = ?
            WHERE order_id = ?`,
            [inUseStatus, orderId]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectOrderById, selectOrdersByCustomer, selectOrdersByDate, selectOrdersByPaymentStatus, addOrder, updateOrder, getOrderTypes, updateInUse };