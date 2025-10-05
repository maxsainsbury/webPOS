const pool = require('./connection.js');

const selectCustomerByPhone = async (phoneNumber) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM customers WHERE phoneNumber = ?`,
            [phoneNumber]
        );
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

const addCustomer = async (customer) => {
    try {
        customer.postal_code = customer.postal_code.replaceAll(' ', '');
        const [results] = await pool.query(
            'INSERT INTO customers ' +
            '(f_name, l_name, phone, address_line1, address_line2, email, city, provence, postal_code, delivery_instructions, credit) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [customer.f_name, customer.l_name, customer.phone, customer.address_line1, customer.address_line2, customer.email, customer.city, customer.provence, customer.postal_code, customer.delivery_instructions, customer.credit]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updateCustomer = async (customer) => {
    try {
        customer.postal_code = customer.postal_code.replaceAll(' ', '');
        const [results] = await pool.query(
            'UPDATE customers ' +
            'SET f_name = ?, l_name = ?, phone = ?, address_line1 = ?, address_line2 = ?, email = ?, city = ?, provence = ?, postal_code = ?, delivery_instructions = ?, credit = ? ' +
            'WHERE customer_id = ?',
            [customer.f_name, customer.l_name, customer.phone, customer.address_line1, customer.address_line2, customer.email, customer.city, customer.provence, customer.postal_code, customer.delivery_instructions, customer.credit, customer.customer_id]
        );
        return results;
    }catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectCustomerByPhone, addCustomer , updateCustomer };