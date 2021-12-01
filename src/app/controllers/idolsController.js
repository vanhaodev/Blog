const { cookie } = require('express/lib/response');
const { NULL, render } = require('node-sass');
const idols = require('../models/idols');

class idolsController {
    //GET /news/:slug
    show(req, res, next) {
        idols.findOne({ slug: req.params.slug }).lean()
            .then(idols => {  
                res.render('idols/show_idols', { idols });
            })
            .catch(next);     
    }
  

    page_idols(req, res, next) {
        idols.find({}).lean()
            .then(idols => {
                res.render('idols/page_idols', { idols });
            })
            .catch(next);
    }


    create(req, res, next) {
        res.render('idols/create');
    }

    creating(req, res, next) {
        const idols_data = new idols(req.body);
        idols_data.save()
            .then(() => res.redirect('/idols/edit'))
            .catch(next);
    }

    edit(req, res, next) {
        res.clearCookie('idolsUpdate_logs'); //Xóa cookie phần báo lỗi input ở idols update
        Promise.all([
            idols.find({}).sortable(req).lean(),
            idols.countDocumentsDeleted()
        ]).then(([idols, deleteCount]) =>
            res.render('idols/edit', { deleteCount, idols }),
        )
            .catch(next);
    }

    //khi đã chọn 1 idol để sửa
    editing(req, res, next) {
        idols.findById(req.params.id).lean()
            .then(idols => {
                const xxx = req.cookies['idolsUpdate_logs'];
                //console.log(xxx);
                res.render('idols/edit_form', {idols, xxx});
            })
            .catch(next);
    }

    //PUT khi nhấn lưu
    update(req, res, next) {
        idols.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/idols/edit'))
            .catch(next);
    }

    //Delete idol
    delete(req, res, next) {
        idols.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //Delete idol vĩnh viễn
    forceDelete(req, res, next) {
        idols.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    deleted(req, res, next) {
        idols.findDeleted({}).lean()
            .then(idols => {
                res.render('idols/deleted', { idols });
            })
            .catch(next);
    }

    //PATCH khôi phục idol đã xóa
    restore(req, res, next) {
        idols.restore({ _id: req.params.id }).lean()
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new idolsController;