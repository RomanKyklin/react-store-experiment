const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
    title: String,
    products: {type: Schema.Types.ObjectId, ref: 'Product'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);