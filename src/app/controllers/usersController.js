const { cookie } = require('express/lib/response');
const { model } = require('mongoose');
const { NULL, render } = require('node-sass');
const users = require('../models/users');

class usersController{
    register(req, res, next){
        res.send('test register');
    }

    login(req, res, next){
        res.render('users/login');
    }

    trylogin(req, res, next){
       res.json(req.body);
    }
}

module.exports = new usersController;