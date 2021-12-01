const idols = require('../models/idols');
module.exports = function updateidolsMiddleware(req, res, next){
    let errors = [];
    
    if (req.body.name == ''|| Object.keys(req.body.name).length > 30) {       
        errors.push('Tên không được để trống và phải nhỏ hơn 30 ký tự!');
    }
    if (req.body.description == ''|| Object.keys(req.body.description).length > 3000 || Object.keys(req.body.description).length < 30) {       
        errors.push('Mô tả phải lớn hơn 30 ký tự và phải nhỏ hơn 3000 ký tự!');
    }
    if (req.body.image == '') {       
        errors.push('Đừng để trống hình ảnh (yêu cầu đường link ảnh)!');
    }

    if(errors.length > 0)
    {
        let exportErrors = errors.slice(); //Khởi tạo lưu trữ lỗi
        errors.splice(0,errors.length); //Clear lỗi để lần sau tránh gặp phải
        //console.log('lỗi nào');
        var oldValuesofform = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
        }
        res.cookie('idolsUpdate_logs', exportErrors);
        res.redirect('back');
    }
    else {
        res.clearCookie('idolsUpdate_logs');
        next();
    }
}