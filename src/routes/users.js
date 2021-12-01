var express = require('express');
var router = express.Router();
const usersController = require('../app/controllers/usersController');
const loginMiddleware = require('../app/middlewares/loginMiddleware');


router.get('/register', usersController.register); //đăng ký
router.get('/login', usersController.login); //đăng nhập
router.post('/trylogin', loginMiddleware, usersController.trylogin);

module.exports = router;