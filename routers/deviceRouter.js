const { Router } = require('express');

const DeviceControler = require('../controllers/DeviceController');

const router = new Router();

router.get('/', DeviceControler.getAll);
router.get('/:id', DeviceControler.getOneById);
router.post('/', DeviceControler.create);

module.exports = router;
