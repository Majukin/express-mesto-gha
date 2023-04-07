const jwt = require('jsonwebtoken');

const athorization = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const payload = jwt.verify(token, 'MY_SECRET_KEY');
    console.log(payload);

    req.user = payload;
    next();
  } catch (error) {
    res.send('Невалидный токен');
  }
};

module.exports = { athorization };
