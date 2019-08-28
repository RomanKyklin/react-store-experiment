const Product = require('../models/product.model.js');
const Category = require('../models/category.model');

exports.find = (req, res) => {
    if (!req.query.id) {
        return res.status(400).send({
            message: "Product id can not be empty"
        });
    }

    Product.findById(req.query.id)
        .populate('category')
        .then(product => {
            if (!product) {
                return res.status(400).send({
                    message: "Product not found!"
                });
            }
            res.send(product);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error finding product with id " + req.params.id
            });
        })
};

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
            message: err.message || "Some error occurred while creating the product."
        });
    });
};

exports.change = (req, res) => {
    if (!req.body.id || !req.body.title || !req.body.sellingPrice || !req.body.purchasePrice || !req.body.category) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    Product.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        selling_price: req.body.sellingPrice,
        purchase_price: req.body.purchasePrice,
        category: req.body.category,
    }, {new: true})
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            res.send(product);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.id
            });
        })

};

exports.delete = (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({
            message: "Product id can not be empty"
        });
    }

    Product.findByIdAndDelete(req.body.id)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }

            res.status(200).send({
                message: "product removed successfully with id " + req.body.id
            })
        }
        )
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting product with id " + req.params.id
            });
        })
};

exports.findByCategory = (req, res) => {
    if(!req.query.id) {
        return res.status(400).send({
            message: "Category id can not be empty"
        })
    }

    Product.find({category: req.query.id})
        .populate('category')
        .then(products => {
            if(!products) {
                return res.status(404).send({
                    message: "Products not found with category id " + req.params.id
                });
            }
            return res.status(200).send(products);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Products not found with category id " + req.query.id
                });
            }
            return res.status(500).send({
                message: "Error searching products with category id " + req.query.id
            });
        })
};
