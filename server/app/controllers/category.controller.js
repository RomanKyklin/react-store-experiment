const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.findAll = (req, res) => {
    Category
        .find()
        .then(categories => res.send(categories))
        .catch(error => res.status(500).send({
            message: error.message || "Some error occurred while retrieving notes."
        }));
};

exports.create = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: "Category title can not be empty"
        });
    }
    const category = new Category({
        title: req.body.title,
    });

    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.delete = (req, res) => {
    const {id = ''} = req.body;

    if (!id) {
        return res.status(400).send({
            message: `Category id can not be empty`,
        });
    }

    Category.findByIdAndDelete(id)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + id
                });
            }
        })
        .then(() => {
            return res.status(200).send({
                message: "Category removed successfully with id " + id
            })
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error deleting product with id " + id
            });
        });

    Category.find({title: "without category"})
        .then(category => {
            if (category) {
                Product.updateMany({"category": id}, {"$set": {"category": category[0]._id}})
                    .then(product => {
                        return res.status(200).send({message: "success"});
                    })
                    .catch(err => {
                        return res.status(400).send({err: err.message});
                    });
            }
        })
        .catch(err => {
            return res.status(400).send({err: err.message});
        });
};
