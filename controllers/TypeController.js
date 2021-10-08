const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;

      const type = await Type.create({ name });

      return res.json(type);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TypeController();
