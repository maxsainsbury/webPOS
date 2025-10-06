const pool = require('./connection.js');

//function to search for a customer by their phone number
const selectCustomerByPhone = async (phoneNumber) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM customers WHERE phone = ?`,
            [phoneNumber]
        );
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

//function to add a customer to the database
const addCustomer = async (customer) => {
    try {
        customer.postal_code = customer.postal_code.replaceAll(' ', '');
        const [results] = await pool.query(
            `INSERT INTO customers 
             (f_name, l_name, phone, address_line1, address_line2, email, city, provence, postal_code, delivery_instructions, credit)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [customer.f_name, customer.l_name, customer.phone, customer.address_line1, customer.address_line2, customer.email, customer.city, customer.provence, customer.postal_code, customer.delivery_instructions, customer.credit]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to update a customers into in the database
const updateCustomer = async (customer) => {
    try {
        customer.postal_code = customer.postal_code.replaceAll(' ', '');
        const [results] = await pool.query(
            `UPDATE customers
             SET f_name = ?, l_name = ?, phone = ?, address_line1 = ?, address_line2 = ?, email = ?, city = ?, provence = ?, postal_code = ?, delivery_instructions = ?, credit = ?
             WHERE customer_id = ?`,
            [customer.f_name, customer.l_name, customer.phone, customer.address_line1, customer.address_line2, customer.email, customer.city, customer.provence, customer.postal_code, customer.delivery_instructions, customer.credit, customer.customer_id]
        );
        return results;
    }catch (error) {
        console.log(error.message);
    }
}

//export all functions
module.exports = { selectCustomerByPhone, addCustomer , updateCustomer };