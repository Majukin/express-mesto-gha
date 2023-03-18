const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/not-found-err');
const HandlerError = require('./errors/handler-err');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// Передаем контроллеры из users
const { createUser, login } = require('./controllers/users');

// Подключаем мангуст
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// Создание роута для логина и пароля
app.post('/signup', createUser);
app.post('/signin', login);

// Подключаем порт
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// обработчик ошибки неправильного пути
app.all('*', (req, res, next) => {
  next(new NotFoundError('Несуществтующий эндпоинт'));
});

// обработчик ошибки сервера
app.use(HandlerError);
