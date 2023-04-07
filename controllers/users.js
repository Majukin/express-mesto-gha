const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.send(user.toJSON()))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь уже существует'));
        }
      });
  });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => res.send({
      _id: [user._id],
      avatar: user.avatar,
      name,
      about,
    }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => res.send({
      _id: user._id,
      avatar,
      name: user.name,
      about: user.about,
    }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .orFail()
    .then(async (user) => {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign({ _id: user._id }, 'MY_SECRET_KEY');
        res.cookie('jwt', token, {
          maxAge: 3600,
          httpOnly: true,
        }).send(user.toJSON());
      } else {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch(next);
};
