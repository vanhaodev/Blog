const users = require('../models/users');
module.exports = function loginMiddleware(req, res, next) {

    users.findOne({ username: req.body.username }, function (err, user) {
        let loginLogs = {
            loginFailed: ''
        }
        if (err) {
            loginLogs.loginFailed = 'Đăng nhập thất bại!';
            res.render('users/login', { loginLogs });
        }
        if (user && user.password === req.body.password) {
            loginLogs.loginFailed = '';
            res.cookie('login', 'ok');
            res.json(user);
        } else {
            loginLogs.loginFailed = 'Đăng nhập thất bại!';
            res.render('users/login', { loginLogs });
        }
    });

}