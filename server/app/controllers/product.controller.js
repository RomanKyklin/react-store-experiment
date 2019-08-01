const Product = require('../models/product.model.js');
const Category = require('../models/category.model');

exports.findAll = (req, res) => {
    Product.find()
        .populate('category')
        .then((products) => res.send(products))
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving notes."
            });
        })
};

exports.create = (req, res) => {
    if (!req.body.title || !req.body.sellingPrice || !req.body.purchasePrice || !req.body.category) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    const product = new Product({
        title: req.body.title,
        selling_price: req.body.sellingPrice,
        purchase_price: req.body.purchasePrice,
        category: req.body.category,
    });

    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
