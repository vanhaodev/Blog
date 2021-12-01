const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const idolsSchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String, default: 'Chưa có mô tả', maxlength: 2048, },
    image: { type: String, default: '', maxlength: 2048 },
    slug: { type: String, slug: 'name', unique: true },
    views: { type: Number, default: 0, },
    likes: { type: Number, default: 0, },
    dislikes: { type: Number, default: 0, },
    deletedAt: { type: Date },
    deleted: { type: Boolean },
}, {
    timestamps: true,
});

//custm query helper
idolsSchema.query.sortable = function (req) {
    //Kiểm tra url có yêu cầu sort a-z không?
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);

        return this.sort({
            [req.query.col]: isValidtype ? req.query.type : 'desc',
        });
    };
    //Kiểm tra url có yêu cầu sort a-z không? (xếp ngày tạo)
    if(req.query.hasOwnProperty('_sortBydate')){
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.col]: isValidtype ? req.query.type : 'desc',
           
        });
    };

    return this;    
};

mongoose.plugin(slug);
idolsSchema.plugin(mongooseDelete, { //Plugin tự động đưa idol vào thùng rác (kiểu xóa mềm)
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('idols', idolsSchema);