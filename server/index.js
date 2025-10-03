const express = require('express');
const app = express();
const cors = require('cors');
const { selectItems } = require('./mysqlConnection/items.js');

console.log(app);
app.use(cors());


app.get('/', (req, res) => {
    selectItems();
});

app.listen(8080, () => {
    console.log('server listening on port 8080');
});