const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Подключаем мангуст
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// Добавляем пользователя
app.use((req, res, next) => {
  req.user = { _id: '63dc3e0cba12d760dd7e25d2' };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// Подключаем порт
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const NOT_FOUND = 404;

app.all('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Несуществтующий эндпоинт' });
});
