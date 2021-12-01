const express = require('express');
const router = express.Router();
const idolsController = require('../app/controllers/idolsController');
const createidolsMiddleware = require('../app/middlewares/createidolsMiddleware');
const updateidolsMiddleware = require('../app/middlewares/updateidolsMiddleware');

router.get('/create', idolsController.create);//tạo idol


//router.post('/creating', idolsController.creating); //load khi tạo 

// router.post('/creating', function (req, res, next) {
//     if (req.body.name == ''|| req.body.description == ''|| req.body.image == ' ') {       
//         //res.render('idols/create', { alertError });
//         res.json({mess: "Thua"});
//     }
//     else {
//         return next();
//     }
// }, idolsController.creating); //load khi tạo 

router.post('/creating', createidolsMiddleware, idolsController.creating); //load khi tạo 

router.get('/edit', idolsController.edit);//edit idol
router.get('/edit/:id', idolsController.editing);//edit idol (khi đã chọn)
router.put('/:id', updateidolsMiddleware, idolsController.update);//update idol (khi đã sửa)
router.delete('/:id', idolsController.delete);//xóa idol vào thùng rác
router.get('/deleted', idolsController.deleted);
router.patch('/:id/restore', idolsController.restore);//khôi phục đã xóa
router.delete('/:id/force', idolsController.forceDelete);//xóa idol vĩnh viễn
router.get('/:slug', idolsController.show);
router.get('/', idolsController.page_idols);

module.exports = router;