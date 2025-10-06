const pool = require('./connection.js');
const {intToBool, boolToInt} = require('../helpers/helperFunctions.js');

//function to search for a order by the id
const selectOrderById = async (orderId) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM orders WHERE order_id = ?`,
            [orderId]
        );
        results.is_future_order = intToBool(results.is_future_order);
        return results[0];
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
            results.is_future_order = intToBool(results.is_future_order);
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
            results.is_future_order = intToBool(results.is_future_order);
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
            results.is_future_order = intToBool(results.is_future_order);
        }
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to add a order to the database
const addOrder = async (order) => {
    try {
        order.is_future_order = boolToInt(order.is_future_order);
        const [results] = await pool.query(
            `INSERT INTO orders 
            (customer_id, user_id, order_number, order_type, order_status, is_future_order, scheduled_date, scheduled_time, subtotal, tax_amount, payment_status, special_instructions)
            VALUE (?, ?, ?, ?, 'Scheduled', ?, ?, ?, ?, ?, ?, ?)`,
            [order.customer_id, order.user_id, order.order_number, order.order_type, order.is_future_order, order.scheduled_date, order.scheduled_time, order.subtotal, order.tax_amount, order.payment_status. order.special_instructions]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to update an order in the database
const updateOrder = async (order) => {
    try {
        order.is_future_order = boolToInt(order.is_future_order);
        const [results] = await pool.query(
            `UPDATE orders
            SET customer_id = ?, user_id = ?, order_number = ?, order_type = ?, order_status = ?, is_future_order = ?, scheduled_date = ?, scheduled_time = ?, subtotal = ?, tax_amount = ?, tip_amount = ?, payment_status = ?, special_instructions = ?
            WHERE order_id = ?`
            [order.customer_id, order.user_id, order.order_number, order.order_type, order.order_status, order.is_future_order, order.scheduled_date, order.scheduled_time, order.subtotal, order.tax_amount, order.tip_amount, order.payment_status, order.special_instructions, order.order_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectOrderById, selectOrdersByCustomer, selectOrdersByDate, selectOrdersByPaymentStatus, addOrder, updateOrder };