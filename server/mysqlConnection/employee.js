const pool = require('connection.js');

const selectEmployeeByPassword = async (password) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM employee WHERE password = ?`,
            [password]
        );
        return resuls[0];
    } catch (error) {
        console.log(error.message);
    }
}

const selectEmployees = async () => {
    try {
        const [results, fields] = await pool.query(
            `SELECT employee_id, f_name, l_name FROM employee`
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const selectEmployeeById = async (employeeId) => {
    try {
        const [results, fields] = await pool.query(
            `SELECT * FROM employee WHERE employee_id = ?`,
            [employeeId]
        );
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

const addEmployee = async (employee) => {
    try {
        const [results] = await pool.query(
            `INSERT INTO employee (password, role, position, hourly_rate, f_name, l_name, email, hire_date, phone)
            VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [employee.password, employee.role, employee.position, employee.hourly_rate, employee.f_name, employee.l_name, employee.email, employee.hire_date, employ.phone]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

const updateEmployee = async (employee) => {
    try {
        const [results] = await pool.query(
            `UPDATE employee 
            SET role = ?, position = ?, hourly_rate = ?, f_name = ?, l_name = ?, email = ?, hire_date = ?, phone = ? 
            WHERE employee_id = ?`,
            [employee.role, employee.position, employee.hourly_rate, employee.f_name, employee.l_name, employee.email, employee.hire_date, employee.phone, employee.employee_id]
        );
        return resuls;
    } catch (error) {
        console.log(error.message);
    }
}

const updateEmployeePassword = async (employee) => {
    try {
        const [results] = await pool.query(
            `UPDATE employee
            SET password = ?
            WHERE employee_id = ?`,
            [employee.password, employee.employee_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { selectEmployeeByPassword, selectEmployees, selectEmployeeById, addEmployee, updateEmployee, updateEmployeePassword };2