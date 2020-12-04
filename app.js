const express = require('express');
const path = require('path');

const usersData = require('./users.json');

const router = require('./routes/users.js');
const cards = require('./routes/cards.js')
const api = require('./routes/cards.js');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use('/users', router);
app.use('/cards', cards);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})

/*GET localhost:3000/users  JSON-список всех пользователей
GET localhost:3000/cards  JSON-список всех карточек
GET localhost:3000/users/8340d0ec33270a25f2413b69 JSON-пользователя
с переданным после /users идентификатором.
Если такого нет, API должно возвращать 404 статус ответа и
JSON:{ "message": "Нет пользователя с таким id" }
Несуществующий адрес  { "message": "Запрашиваемый ресурс не найден" }*/