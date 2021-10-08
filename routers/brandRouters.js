const { Router } = require('express');

const BrandController = require('../controllers/BrandController');

const router = new Router();

router.get('/', BrandController.getAll);

router.post('/', checkRoleNidlleware('ADMIN'), BrandController.create);

module.exports = router;
