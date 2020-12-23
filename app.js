const express = require('express');
const path = require('path');

const router = require('./routes/users.js');
const cards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/users', router);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {});
