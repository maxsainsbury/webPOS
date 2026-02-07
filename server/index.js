const express = require('express');
const app = express();
const cors = require('cors');
const { selectItemsByCategory, selectItemById, addItem, updateItem } = require('./mysqlConnection/items.js');
const { selectModsByCategory } = require('./mysqlConnection/mods.js');
const { selectCategory } = require('./mysqlConnection/categories.js');
const { selectCustomerByPhone, addCustomer, updateCustomer } = require('./mysqlConnection/customers.js');
const { allNumbers, phoneNumberRegex } = require('./regex/regex.js');
const {selectEmployeeByPassword, selectEmployees, selectEmployeeById, addEmployee, updateEmployee,
    updateEmployeePassword
} = require("./mysqlConnection/employee");
const {selectCustomerById} = require("./mysqlConnection/customers");
const {addCategory, updateCategory} = require("./mysqlConnection/categories");
const {selectModsByItem, selectModsByItemDefault, selectModsById, addMod, updateMod} = require("./mysqlConnection/mods");

console.log(app);
app.use(express.json());
app.use(cors());

//get an item by the item id
app.get('/items/:itemId', async (req, res) => {
    try {
        //if the itemId is only numbers
        if(req.params.itemId.match(allNumbers)) {
            const results = await selectItemById(req.params.itemId);
            //if there are results
            if(results) {
                res.status(200).json(results);
            }
            else {
                res.status(404).json({error: 'Not Found'});
            }
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all item by a category id
app.get('/category/:categoryId/items', async (req, res) => {
    try {
        //if id is all numbers
        if(req.params.categoryId.match(allNumbers)) {
            const results = await selectItemsByCategory(req.params.categoryId);
            //if there are results
            if(results.length) {
                res.status(200).json(results);
            }
            else {
                res.status(404).json({ error: 'Not Found' });
            }
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add an item
app.post('/items/add', async (req, res) => {
    try {
        const results = await addItem(req.body);
        if(results) {
            if(results.affectedRows) {
                res.status(201).json(results);
            }
            else {
                res.status(400).json({ error: 'Item not added' });
            }
        }
        else {
            res.status(400).json({ error: 'Item not added' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update an item
app.post('/items/update', async (req, res) => {
    try {
        const results = await updateItem(req.body);
        //if the customer was updated
        if(results.affectedRows > 0) {
            res.status(200).send();
        }
        else {
            res.status(400).json({error: 'Could not update Item'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all mods by a category id
app.get('/category/:categoryId/mods', async (req, res) => {
    try {
        //if id is all numbers
        if(req.params.categoryId.match(allNumbers)) {
            const results = await selectModsByCategory(req.params.categoryId);
            //if there are results
            if(results.length) {
                res.status(200).json(results);
            }
            else {
                res.status(404).json({ error: 'Not Found' });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get mods that are default to an item
app.get('/mods/item/:itemId/default', async (req, res) => {
    try {
        const results = await selectModsByItemDefault(req.params.itemId);
        if(results) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get mod by mod id
app.get('/mods/:modId', async (req, res) => {
    try {
        const results = await selectModsById(req.params.modId);
        if (results) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add a mod
app.post('/mods/add', async (req, res) => {
    try {
        const results = await addMod(req.body);
        if(results && results.affectedRows > 0) {
            res.status(201).send();
        }
        else {
            res.status(400).json({ error: 'Mod not added' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update a mod
app.post('/mods/update', async (req, res) => {
    try {
        const results = await updateMod(req.body);
        if(results && results.affectedRows > 0) {
            res.status(200).send();
        }
        else {
            res.status(400).json({ error: 'Mod not updated' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all categories
app.get('/category', async (req, res) => {
    try {
        const results = await selectCategory();
        //if there are results
        if(results.length) {
            res.status(200).send(results);
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add a category
app.post('/category/add', async (req, res) => {
    try {
        const results = await addCategory(req.body);
        if(results) {
            if(results.affectedRows > 0) {
                res.status(201).send();
            }
            else {
                res.status(400).json({ error: 'Category not added' });
            }
        }
        else {
            res.status(400).json({ error: 'Category not added' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update a category
app.post('/category/update', async (req, res) => {
    try {
        const results = await updateCategory(req.body);
        if(results) {
            if(results.affectedRows > 0) {
                res.status(201).send();
            }
            else {
                res.status(400).json({ error: 'Category not added' });
            }
        }
        else {
            res.status(400).json({ error: 'Category not added' });
        }
    } catch(error) {
        console.log(error.message);
    }
})

//get a customer by their phone number
app.get('/customers/phone/:phoneNumber', async (req, res) => {
    try {
        //replace anything that isn't a number with nothing
        const phoneNumber = req.params.phoneNumber.replace(/\D/g, '');
        //check if the phone number is all numbers and 10 or 11 digits long
        if(phoneNumber.match(phoneNumberRegex)) {
            const results = await selectCustomerByPhone(phoneNumber);
            //if there is results
            if(results) {
                res.status(200).json(results);
            }
            else {
                res.status(404).json({ error: 'Not Found' });
            }
        }
        else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get a customer by their id
app.get('/customers/:customerId', async (req, res) => {
    try {
        const results = await selectCustomerById(req.params.customerId);
        if (results) {
            res.status(200).send(results);
        } else {
            res.status(404).json({error: 'Not Found'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add a customer
app.post('/customers/add', async (req, res) => {
    try {
        const results = await addCustomer(req.body);
        //if there are results
        if(results) {
            //if the customers inf o was changed
            if (results.affectedRows > 0) {
                res.status(201).send();
            } else {
                res.status(400).json({error: 'Could not add Customers'});
            }
        }
        else {
            res.status(400).json({error: 'Could not add Customers'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update a customer
app.post('/customers/update', async (req, res) => {
    try {
        const results = await updateCustomer(req.body);
        //if the customer was updated
        if(results.affectedRows > 0) {
            res.status(200).send();
        }
        else {
            res.status(400).json({error: 'Could not update Customers'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//employee login
app.post('/employees/login', async (req, res) => {
    try {
        const results = await selectEmployeeByPassword(req.body);
        if(results) {
            res.status(200).json(results);
        }
        else {
            res.status(403).json({ error: 'Incorrect Password' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all employees
app.get('/employees', async (req, res) => {
    try {
        const results = await selectEmployees();
        if(results.length) {
            res.status(200).json(results);
        }
        else {
            res.status(200).json();
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get employee by id
app.get('/employees/:employeeId', async (req, res) => {
    try {
        const [results] = await selectEmployeeById(req.params.employeeId);
        if(results) {
            res.status(200).json(results);
        }
        else {
            res.status(404).json({ error: 'Employee Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add an employee
app.post('/employees/add', async (req, res) => {
    try {
        const results = await addEmployee(req.body);
        if(results) {
            if (results.affectedRows > 0) {
                res.status(201).send();
            }
            else {
                res.status(400).json({error: 'Could not add Employee'});
            }
        }
        else {
            res.status(400).json({error: 'Could not add Employee'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

//update an employee
app.post('/employees/update', async (req, res) => {
    try {
        const [results] = await updateEmployee(req.body);
        if(results) {
            if (results.affectedRows > 0) {
                res.status(201).send();
            }
            else {
                res.status(400).json({error: 'Could not update Employee'});
            }
        }
        else {
            res.status(400).json({error: 'Could not update Employee'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/employees/update/password', async (req, res) => {
    try {
        const results = await updateEmployeePassword(req.body);
        if(results) {
            if (results.affectedRows > 0) {
                res.status(201).send();
            }
            else {
                res.status(400).json({error: 'Could not update Employee'});
            }
        }
        else {
            res.status(400).json({error: 'Could not update Employee'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
});