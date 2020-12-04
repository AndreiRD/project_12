const express = require('express');
const path = require('path');

const usersData = require('./users.json');

const router = require('./routes/users.js');
const cards = require('./routes/cards.js')
const api = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/users', router);
app.use('/cards', cards);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
