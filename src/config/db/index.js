//KẾT NỐI ĐẾN MONGODB
const mongoose = require('mongoose');

function connect(){
    try {
        mongoose.connect('mongodb://localhost:27017/aoeteam');
        useCreateIndex: true,
        console.log('Kết nối ok!');
    } catch (error) {
        console.log('Kết nối thất bại!');
    }

}
module.exports = {connect};
