const categoryService = require('../services/category.service');
const productService = require('../services/product.service');
const _ = require("lodash");

exports.findAll = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        return res.send(categories);
    } catch (e) {
        return res.status(500).send({
            message: error.message || "Some error occurred while retrieving categories."
        })
    }
};

exports.create = async (req, res) => {
    const title = _.get(req.body, 'title', null);

    if (!title) {
        return res.status(400).send({
            message: "Category title can not be empty"
        });
    }

    try {
        const category = await categoryService.createCategory(title);
        return res.send(category);
    } catch (e) {
        return res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        })
    }
};

exports.delete = async (req, res) => {
    const {id = ''} = req.body;

    if (!id) {
        return res.status(400).send({
            message: `Category id can not be empty`,
        });
    }

    try {
        const categories = await categoryService.getCategories({title: "without category"});
        const withoutCategory = categories.length > 0 ? categories[0] : await categoryService.createCategory('without category');

        await productService.updateMany({"category": id}, {"$set": {"category": withoutCategory._id}});
        await categoryService.deleteCategory(id);

        return res.status(200).send({
            message: "Category removed successfully with id " + id
        });

    } catch (e) {
        return res.status(500).send({
            message: e.message || "Error deleting product with id " + id
        })
    }
};
