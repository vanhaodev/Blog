const idols = require('../models/idols');

class SiteController {
    //GET /
    index(req, res, next){
        //Quét database
        idols.find({}).lean()
        .then(idols =>{
            res.render('home', {idols});
        })
        .catch(next);
   
        /*cách ngắn gọn hơn không dùng toObject
        /nhưng nhìn rối vl
        idol.find({}).lean()
        .then(idols => {
            idols = idols.map(idol => idol => idol.toObject())
            res.render('home', {idols});
        })
        .catch(next);       
        */
    }
    //GET /search
    search(req, res) {
        res.render('search', {search: req.query.q});
    }
}

module.exports = new SiteController;