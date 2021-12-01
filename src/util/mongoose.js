
/*phương thức require nè 
const {multipleMongooseToObject} = require('../../util/mongoose');
*/

//Chuyển đổi dữ liệu DB qua object - HIỆN TẠI KHÔNG CẦN VÌ ĐÃ CÓ lean()
module.exports = {
    multipleMongooseToObject: function (mongoose){
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToOject: function (mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
};