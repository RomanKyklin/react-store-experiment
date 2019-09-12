const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    title: String,
    selling_price: Number,
    purchase_price: Number,
    image: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);