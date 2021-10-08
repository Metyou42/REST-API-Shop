const { Router } = require('express');

const UserController = require('../controllers/UserController');
const authMidlleware = require('../middleware/authMidlleware');

const router = new Router();

router.get('/auth', authMidlleware, UserController.check);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);

module.exports = router;
