const Category = require('../models/category.model');
const Product = require('../models/product.model');
const categoryService = require('../services/category.service');
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

exports.delete = (req, res) => {
    const {id = ''} = req.body;

    if (!id) {
        return res.status(400).send({
            message: `Category id can not be empty`,
        });
    }

    Category.find({title: "without category"})
        .then(categories => {
            if (categories.length > 0) {
                Product.updateMany({"category": id}, {"$set": {"category": categories[0]._id}})
                    .then(() => res.status(200).send({message: "success"}))
                    .catch(err => res.status(400).send({message: err.message}));
            }
        })
        .then(() => Category.findByIdAndDelete(id)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: "Category not found with id " + id
                    });
                }
            })
            .then(() => res.status(200).send({
                message: "Category removed successfully with id " + id
            }))
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Category not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error deleting product with id " + id
                });
            }))
        .catch(err => res.status(400).send({err: err.message}));
};
