const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, maxlength: 50, minlength: 4, default: 'password', },
    email: { type: String, },
    image: { type: String, default: '', maxlength: 2048 },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});
mongoose.plugin(slug);
module.exports = mongoose.model('users', usersSchema);