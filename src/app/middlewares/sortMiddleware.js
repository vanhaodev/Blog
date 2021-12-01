module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };
    res.locals._sortBydate = {
        enabled: false,
        type: 'default',
    };
    if(req.query.hasOwnProperty('_sort')){

        //cách 1
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.col = req.query.col;

        //cách 2 (tối ưu hơn)
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            col: req.query.col,
        });
    }

    if(req.query.hasOwnProperty('_sortBydate')){
        Object.assign(res.locals._sortBydate, {
            enabled: true,
            type: req.query.type,
            col: req.query.col,
        });
    }
    next();
}