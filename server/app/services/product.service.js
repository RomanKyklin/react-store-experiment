const Product = require('../models/product.model');

/**
 * Get products from the database
 * @param {Object} query
 * @param {Number} perPage
 * @param {Number} page
 * @returns {*|Aggregate}
 */
exports.getProducts = (query = {}, perPage = 10, page = 1) => {
    try {
        return Product.find(query)
            .populate('category')
            .skip((perPage * page) - perPage)
            .limit(perPage);
    } catch (e) {
        throw Error("Some error occurred while retrieving product.");
    }
};

/**
 * @param id
 * @returns {Query}
 */
exports.getProductById = id => {
    try {
        return Product.findById(id).populate('category');
    } catch (e) {
        throw Error("Error finding product with id " + id);
    }
};

/**
 * Get count of products in the database
 * @param {Object} query
 * @returns {Query}
 */
exports.getProductsCount = (query = {}) => {
    try {
        return Product.countDocuments(query);
    } catch (e) {
        throw Error("Some error occurred while retrieving products count.");
    }
};

/**
 * @param title
 * @param sellingPrice
 * @param purchasePrice
 * @param category
 * @returns {*}
 */
exports.createProduct = (title = null, sellingPrice = null, purchasePrice = null, category = null) => {
    try {
        const product = new Product({
            title,
            selling_price: sellingPrice,
            purchase_price: purchasePrice,
            category,
        });

        return product.save();
    } catch (e) {
        throw Error("Some error occurred while creating the product.")
    }

};

/**
 * @param id
 * @param title
 * @param sellingPrice
 * @param purchasePrice
 * @param category
 * @returns {Query}
 */
exports.changeProduct = (id, title = null, sellingPrice = null, purchasePrice = null, category = null) => {
    try {
        return Product.findByIdAndUpdate(id, {
            title,
            selling_price: sellingPrice,
            purchase_price: purchasePrice,
            category,
        }, {new: true});
    } catch (e) {
        throw Error("Error updating product with id " + id)
    }
};

exports.deleteProduct = id => {
    try {
        return Product.findByIdAndDelete(id);
    } catch (e) {
        throw Error("Error deleting product with id " + id);
    }
};

exports.updateMany = (params, query) => {
    try {
        return Product.updateMany(params, query);
    } catch (e) {
        throw Error("Error updating products");
    }
};