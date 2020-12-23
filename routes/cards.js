const cards = require('express').Router(); // создали роутер
const fs = require('fs').promises; // данные нужны для роутинга, поэтому импортируем их

cards.get('/', (req, res) => {
  fs.readFile('data/cards.json', 'utf-8')
    .then((data) => {
      const filedata = JSON.parse(data);
      res.status(200).json(filedata);
    })

    .catch(() => {
      res.status(500).json({ message: 'Ошибка при чтении файла' });
    });
});

module.exports = cards; // экспортировали роутер
