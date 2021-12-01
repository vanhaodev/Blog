class NewsController {
    //GET /news
    index(req, res){
        res.render('news');
    }

    phim(req, res){
        res.send(`
        <h1> Trang phim hay nhất vn </h1>
        `);
    }
    //GET /news/:slug
    show(req, res) {
        res.send('news nè');
    }
}

module.exports = new NewsController;