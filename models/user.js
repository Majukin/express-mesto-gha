const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (link) => validator.isUrl(link),
        message: 'Неправильный формат ссылки аватара',
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.methods.toJSON = function () {
  const data = this.toObject();

  delete data['password'];
  delete data['__v'];
  return data;
};

module.exports = mongoose.model('user', userSchema);
