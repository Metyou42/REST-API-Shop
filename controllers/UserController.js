const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models');

class UserController {
  static createJwt(id, email, role) {
    return jwt.sign({ id, email, role }, process.env.SECRET_JWT, { expiresIn: '24h' });
  }

  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) return next(ApiError.badRequest('Invalid name or password'));

    const candidate = await User.findOne({ where: { email } });
    if (candidate) return next(ApiError.badRequest('User already existed'));

    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({ email, password: hashPassword, role });
    const basket = await Basket.create({ userId: user.id });

    const token = UserController.createJwt(user.id, email, role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) return next(ApiError.badRequest('Invalid input'));

    const user = await User.findOne({ where: { email } });
    if (!user) return next(ApiError.internal('Invalid email or password'));

    const invalidPassword = await bcrypt.compare(password, user.password);
    if (!invalidPassword) return next(ApiError.internal('Invalid email or password'));

    const token = UserController.createJwt(user.id, email, user.role);

    return res.json({ token });
  }

  async check(req, res, next) {
    const { id, email, role } = req.user;
    const token = UserController.createJwt(id, email, role);
    return res.json({ token });
  }
}

module.exports = new UserController();
