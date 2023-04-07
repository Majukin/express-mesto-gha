const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const authRouter = require('./auth');
const { athorization } = require('../middlewares/validatin');

router.use('/auth', authRouter);

router.use(athorization);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
