const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(404).send({ message: "Пользователь не найден" }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: "id пользователя не найден" }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send(users))
    .catch(() => res.status(400).send({ message: "Переданы некорректные данные в метод создания пользователя" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({
      _id: user._id, avatar: user.avatar, name, about,
    }))
    .catch(() => res.status(400).send({ message: "Переданы некорректные данные в метод обновления профиля" }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({
      _id: user._id, avatar, name: user.name, about: user.about,
    }))
    .catch(() => res.status(400).send({ message: "Переданы некорректные данные в метод обновления аватара" }));
};
