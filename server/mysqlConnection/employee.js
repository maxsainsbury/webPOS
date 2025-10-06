const pool = require('connection.js');

//function to select an employee by their password
const selectEmployeeByPassword = async (password) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM employee WHERE password = ?`,
            [password]
        );
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

//function to select all employees
const selectEmployees = async () => {
    try {
        const [results] = await pool.query(
            `SELECT employee_id, f_name, l_name FROM employee`
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to select an employee by their employee id
const selectEmployeeById = async (employeeId) => {
    try {
        const [results] = await pool.query(
            `SELECT * FROM employee WHERE employee_id = ?`,
            [employeeId]
        );
        return results[0];
    } catch (error) {
        console.log(error.message);
    }
}

//function to add and employee to the database
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

//function to update an employees info in the database
const updateEmployee = async (employee) => {
    try {
        const [results] = await pool.query(
            `UPDATE employee 
            SET role = ?, position = ?, hourly_rate = ?, f_name = ?, l_name = ?, email = ?, hire_date = ?, phone = ? 
            WHERE employee_id = ?`,
            [employee.role, employee.position, employee.hourly_rate, employee.f_name, employee.l_name, employee.email, employee.hire_date, employee.phone, employee.employee_id]
        );
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

//function to update an employees password in the database
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

//export all functions
module.exports = { selectEmployeeByPassword, selectEmployees, selectEmployeeById, addEmployee, updateEmployee, updateEmployeePassword };2