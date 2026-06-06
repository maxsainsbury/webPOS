const pool = require("./connection.js");
const { intToBool, boolToInt } = require("../helpers/helperFunctions.js");

//function to search for a order by the id
const selectOrderById = async (orderId) => {
  try {
    let [rows] = await pool.query(`SELECT * FROM orders WHERE order_id = ?`, [
      orderId,
    ]);
    let order = rows[0];
    order.is_future_order = intToBool(order.is_future_order);
    order.in_use = intToBool(order.in_use);
    [rows] = await pool.query(
      `SELECT oi.*, i.item_name
            FROM order_items oi
            JOIN items i USING(item_id)
            WHERE oi.order_id = ?`,
      [orderId],
    );
    let items = rows;
    for (let i = 0; i < items.length; i++) {
      let mods = await pool.query(
        `SELECT * FROM webpos_db.order_items_mods WHERE order_items_id = ?`,
        [items[i].order_items_id],
      );
    }
    const mods = [];
    let results = {
      order: order,
      items: items,
      mods: mods,
    };
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

//function to search for all orders related to a customer
const selectOrdersByCustomer = async (customerId) => {
  try {
    const [results] = await pool.query(
      `SELECT * FROM orders WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_id = ?)`,
      [customerId],
    );
    for (let i = 0; i < results.length; i++) {
      results[i].is_future_order = intToBool(results[i].is_future_order);
      results[i].in_use = intToBool(results[i].in_use);
    }
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

//function to search for all orders scheduled on a specific date
const selectOrdersByDate = async (date) => {
  try {
    const [results] = await pool.query(
      `SELECT * FROM orders WHERE scheduled_date = ?`,
      [date],
    );
    for (let i = 0; i < results.length; i++) {
      results[i].is_future_order = intToBool(results[i].is_future_order);
      results[i].in_use = intToBool(results[i].in_use);
    }
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

//function to search for orders depending on their payment status
const selectOrdersByPaymentStatus = async (paymentStatus) => {
  try {
    const [results] = await pool.query(
      `SELECT * FROM orders WHERE payment_status = ?`,
      [paymentStatus],
    );
    for (let i = 0; i < results.length; i++) {
      results[i].is_future_order = intToBool(results[i].is_future_order);
      results[i].in_use = intToBool(results[i].in_use);
    }
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

//function to add a order to the database
const addOrder = async (fullOrder) => {
  try {
    let { order, items } = fullOrder;
    order.is_future_order = boolToInt(order.is_future_order);
    order.in_use = boolToInt(order.in_use);
    const [orderResults] = await pool.query(
      `INSERT INTO orders
            (customer_id, employee_id, order_type, order_status, is_future_order, scheduled_date, scheduled_time, payment_status, special_instructions)
            VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.customer_id,
        order.employee_id,
        order.order_type,
        order.order_status,
        order.is_future_order,
        order.scheduled_date,
        order.scheduled_time,
        order.payment_status,
        order.special_instructions,
      ],
    );
    order.order_id = orderResults.insertId;
    let orderItemResults = [];
    for (let i = 0; i < items.length; i++) {
      const [results] = await pool.query(
        `INSERT INTO order_items
                     (order_id, item_id, quantity)
                     VALUE (?, ?, ?)`,
        [order.order_id, items[i].item_id, items[i].quantity],
      );
      orderItemResults.push(results);
    }
    return { order: orderResults, items: orderItemResults };
  } catch (error) {
    console.log(error.message);
  }
};

//function to update an order in the database
const updateOrder = async (fullOrder) => {
  try {
    let { order, items } = fullOrder;
    order.is_future_order = boolToInt(order.is_future_order);
    order.in_use = boolToInt(order.in_use);
    await pool.query(
      `UPDATE orders
            SET customer_id = ?, employee_id = ?, order_type = ?, order_status = ?, is_future_order = ?, scheduled_date = ?, scheduled_time = ?, payment_status = ?, special_instructions = ?
            WHERE order_id = ?`,
      [
        order.customer_id,
        order.employee_id,
        order.order_type,
        order.order_status,
        order.is_future_order,
        order.scheduled_date,
        order.scheduled_time,
        order.payment_status,
        order.special_instructions,
        order.order_id,
      ],
    );

    const [deleteResult] = await pool.query(
      `DELETE FROM order_items
            WHERE order_id = ?`,
      [order.order_id],
    );

    for (let i = 0; i < items.length; i++) {
      const [result] = await pool.query(
        `INSERT INTO order_items
                 SET item_id = ?,
                     quantity = ?,
                     order_id = ?`,
        [items[i].item_id, items[i].quantity, order.order_id],
      );
    }
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

const getOrderTypes = async () => {
  try {
    const [results] = await pool.query(
      `SELECT COLUMN_TYPE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = 'webpos_db'
                AND TABLE_NAME = 'orders'
                AND COLUMN_NAME = 'order_type'`,
    );
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

const updateInUse = async (orderId, inUseStatus) => {
  try {
    inUseStatus = boolToInt(inUseStatus);
    const [results] = await pool.query(
      `UPDATE orders
            SET in_use = ?
            WHERE order_id = ?`,
      [inUseStatus, orderId],
    );
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteOrder = async (orderId) => {
  try {
    const [results] = await pool.query(
      `DELETE FROM orders WHERE order_id = ?`,
      [orderId],
    );
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  selectOrderById,
  selectOrdersByCustomer,
  selectOrdersByDate,
  selectOrdersByPaymentStatus,
  addOrder,
  updateOrder,
  getOrderTypes,
  updateInUse,
  deleteOrder,
};
