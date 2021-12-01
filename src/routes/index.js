
const newsRouter = require('./news');
const siteRouter = require('./site');
const idolsRouter = require('./idols');
const usersRouter = require('./users');
function route(app) {
    app.use('/news', newsRouter);

   app.use('/', siteRouter);
   app.use('/idols', idolsRouter);
   app.use('/users', usersRouter)
}
module.exports = route;