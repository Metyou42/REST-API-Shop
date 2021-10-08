const { Router } = require('express');

const TypeController = require('../controllers/TypeController');
const checkRoleNidlleware = require('../middleware/checkRoleMidlleware');

const router = new Router();

router.get('/', TypeController.getAll);
router.post('/', checkRoleNidlleware('ADMIN'), TypeController.create);

module.exports = router;
