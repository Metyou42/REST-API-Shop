const uuid = require('uuid');
const path = require('path');

const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceControler {
  async create(req, res, next) {
    try {
      const {
        name, price, brandId, typeId, info,
      } = req.body;
      const { img } = req.files;

      const fileName = `${uuid.v4()}.jpg`;
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const device = await Device.create({
        name, price, brandId, typeId, img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach(async (e) => {
          await DeviceInfo.create({
            title: e.title,
            description: e.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      let {
        brandId, typeId, limit, page,
      } = req.query;

      limit = limit || 9;
      page = page || 1;
      const offset = page * limit - limit;
      let devices;

      if (!brandId && !typeId) devices = await Device.findAndCountAll({ limit, offset });
      if (brandId && !typeId) devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
      if (typeId && !brandId) devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
      if (typeId && brandId) devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset });
      return res.json(devices);
    } catch (e) {
      console.log(e);
      next(ApiError.badRequest(e.message));
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });
      return res.json(device);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new DeviceControler();
