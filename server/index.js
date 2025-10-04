const express = require('express');
const app = express();
const cors = require('cors');
const { selectItemsByCategory, selectItemById } = require('./mysqlConnection/items.js');
const { selectCategory } = require('./mysqlConnection/categories.js');
const { allNumbers } = require('./regex/regex.js');

console.log(app);
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
})

app.listen(8080, () => {
    console.log('server listening on port 8080');
});