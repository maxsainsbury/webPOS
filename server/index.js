const express = require('express');
const app = express();
const cors = require('cors');
const { selectItemsByCategory, selectItemById } = require('./mysqlConnection/items.js');
const { selectCategory } = require('./mysqlConnection/categories.js');
const { selectCustomerByPhone, addCustomer, updateCustomer } = require('./mysqlConnection/customers.js');
const { allNumbers, phoneNumber } = require('./regex/regex.js');

console.log(app);
app.use(express.json());
app.use(cors());

app.get('/items/item/:id', async (req, res) => {
    try {
        if(req.params.id.match(allNumbers)) {
            const results = await selectItemById(req.params.id);
            console.log(results);
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

app.get('/items/:id', async (req, res) => {
    try {
        if(req.params.id.match(allNumbers)) {
            const results = await selectItemsByCategory(req.params.id);
            console.log(results);
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

app.get('/categories', async (req, res) => {
    try {
        const results = await selectCategory();
        console.log(results);
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

app.get('/customers/:phoneNumber', async (req, res) => {
    try {
        if(req.params.phoneNumber.match(phoneNumber)) {
            const results = await selectCustomerByPhone(req.params.phoneNumber);
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

app.post('/customers', async (req, res) => {
    try {
        const results = await addCustomer(req.body);
        console.log(results);
        if(results) {
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

app.post('/customers/update', async (req, res) => {
    try {
        const results = await updateCustomer(req.body);
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