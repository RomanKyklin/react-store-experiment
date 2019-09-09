const Category = require('../models/category.model');

/**
 * Get all categories from the database
 * @param query
 * @returns {*}
 */
exports.getCategories = (query = {}) => {
    try {
        return Category.find(query);
    } catch (e) {
        throw Error('Some error occurred while retrieving categories.')
    }
};

/**
 * Insert category to the database
 * @param title
 * @returns {*}
 */
exports.createCategory = title => {
    try {
        const category = new Category({
            title,
        });
        return category.save();
    } catch (e) {
        throw Error('Some error occurred while creating the category.')
    }
};

exports.deleteCategory = id => {
    try {
        return Category.findByIdAndDelete(id);
    } catch (e) {
        throw Error("Some error occurred while deleting the category with id " + id);
    }
};