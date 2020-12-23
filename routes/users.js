const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('data/users.json', 'utf-8')
    .then((data) => {
      const filedata = JSON.parse(data);
      res.status(200).json(filedata);
    })

    .catch(() => {
      res.status(500).json({ message: 'Ошибка при чтении файла' });
    });
});

router.get('/:id', (req, res) => {
  fs.readFile('data/users.json', 'utf-8')
    .then((data) => {
      const idToSearch = req.params.id;
      const user = JSON.parse(data).find((item) => item._id === idToSearch);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    }).catch(() => {
      res.status(500).json({ error: 'На сервере произошла ошибка' });
    });
});

module.exports = router;
