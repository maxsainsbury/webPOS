const pool = require('./connection.js');
const {addCustomer} = require("./customers");

const selectOrderById = async (orderId) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM orders WHERE order_id = ?`,
            [orderId]
        );

        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

const selectOrdersByCustomer = async (customerId) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM orders WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_id = ?)`,
            [customerId]
        );

        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const selectOrdersByDate = async (date) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM orders WHERE scheduled_date = ?`,
            [date]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const selectOrdersByPaymentStatus = async (paymentStatus) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM orders WHERE payment_status = ?`,
            [paymentStatus]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const addOrder = async (order) => {
    try {
        order.is_future_order = (order.is_future_order ? 1: 0);
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

const editOrder = async (order) => {
    try {
        order.is_future_order = (order.is_future_order ? 1: 0);
        const [results] = await pool.query(
            `UPDATE orders
            SET customer_id = ?, user_id = ?, order_number = ?, order_type = ?, order_status = ?, is_future_order = ?, scheduled_date = ?, scheduled_time = ?, subtotal = ?, tax_amount = ?, tip_amount = ?, payment_status = ?, special_instructions = ?
            WHERE order_id = ?`
            [order.customer_id, order.user_id, order.order_number, order.order_type, order.order_status, order.is_future_order, order.scheduled_date, order.scheduled_time, order.subtotal, order.tax_amount, order.tip_amount, order.payment_status. order.special_instructions, order.order_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectOrderById, selectOrdersByCustomer, selectOrdersByDate, selectOrdersByPaymentStatus, addOrder, editOrder };