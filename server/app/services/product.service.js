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

exports.getProductsCount = (query = {}) => {
    try {
        return Product.countDocuments(query);
    } catch (e) {
        throw Error("Some error occurred while retrieving products count.")
    }
};