const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser')

const methodOverride = require('method-override'); //giúp form html hỗ trợ put delete...
const db = require('./config/db');
db.connect();
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/sortMiddleware');
const app = express();

const port = 3000;

var api = express.Router();
const route = require('./routes');
app.use(express.static(path.join(__dirname, 'public'))); //Xác định folder static như có css
app.use(express.urlencoded()); //Xử lý dữ liệu POST
app.use(express.json()); //Xử lý dữ liệu từ POST (Javascript, XML, fetch...)
app.use(methodOverride('_method'));
app.use(cookieParser());

//custom middle (sort idols theo thứ tự )
app.use(SortMiddleware);
//-------------Khởi tạo view engine Handlebars
var hbs = handlebars.create({
  extname: '.hbs', //đổi đuôi file mặc định thành .hbs (gốc là .handlebars)
  helpers: require('./helpers/handlebars'), //lấy module tự chế bên helper

});
app.engine('hbs', hbs.engine); //sử dụng engine hbs
app.set('view engine', 'hbs'); //set Engnine là Handlebars
app.set('views', path.join(__dirname, 'resources', 'views')); //Khởi tạo path chứa file .hbs
//----------------------------------------------------
route(app); //gọi routes các đường link

//Nghe 
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});