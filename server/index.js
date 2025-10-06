const express = require('express');
const app = express();
const cors = require('cors');
const { selectItemsByCategory, selectItemById } = require('./mysqlConnection/items.js');
const { selectModsByCategory } = require('./mysqlConnection/mods.js');
const { selectCategory } = require('./mysqlConnection/categories.js');
const { selectCustomerByPhone, addCustomer, updateCustomer } = require('./mysqlConnection/customers.js');
const { allNumbers, phoneNumberRegex } = require('./regex/regex.js');

console.log(app);
app.use(express.json());
app.use(cors());

//get an item by the item id
app.get('/items/item/:itemId', async (req, res) => {
    try {
        //if the itemId is only numbers
        if(req.params.itemId.match(allNumbers)) {
            const results = await selectItemById(req.params.itemId);
            //if there are results
            if(results) {
                res.send(results);
            }
            else {
                res.sendStatus(404).json({error: 'Not Found'});
            }
        }
        else {
            res.sendStatus(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all item by a category id
app.get('/items/:categoryId', async (req, res) => {
    try {
        //if id is all numbers
        if(req.params.categoryId.match(allNumbers)) {
            const results = await selectItemsByCategory(req.params.categoryId);
            //if there are results
            if(results.length) {
                res.send(results);
            }
            else {
                res.sendStatus(404).json({ error: 'Not Found' });
            }
        }
        else {
            res.sendStatus(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get all mods by a category id
app.get('/mods/:categoryId', async (req, res) => {
    try {
        //if id is all numbers
        if(req.params.id.match(allNumbers)) {
            const results = await selectModsByCategory(req.params.categoryId);
            //if there are results
            if(results.length) {
                res.send(results);
            }
            else {
                res.sendStatus(404).json({ error: 'Not Found' });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
})

//get all categories
app.get('/categories', async (req, res) => {
    try {
        const results = await selectCategory();
        //if there are results
        if(results.length) {
            res.send(results);
        }
        else {
            res.sendStatus(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//get a customer by their phone number
app.get('/customers/:phoneNumber', async (req, res) => {
    try {
        //replace anything that isn't a number with nothing
        const phoneNumber = req.params.phoneNumber.replace(/\D/g, '');
        //check if the phone number is all numbers and 10 or 11 digits long
        if(phoneNumber.match(phoneNumberRegex)) {
            const results = await selectCustomerByPhone(phoneNumber);
            //if there is results
            if(results) {
                res.send(results);
            }
            else {
                res.sendStatus(404).json({ error: 'Not Found' });
            }
        }
        else {
            res.sendStatus(404).json({ error: 'Not Found' });
        }
    } catch (error) {
        console.log(error.message);
    }
});

//add a customer
app.post('/customers', async (req, res) => {
    try {
        const results = await addCustomer(req.body);
        //if there are results
        if(results) {
            //if the customers inf o was changed
            if (results.affectedRows > 0) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400).json({error: 'Could not add Customers'});
            }
        }
        else {
            res.sendStatus(400).json({error: 'Could not add Customers'});
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
            res.sendStatus(201);
        }
        else {
            res.sendStatus(400).json({error: 'Could not update Customers'});
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
});