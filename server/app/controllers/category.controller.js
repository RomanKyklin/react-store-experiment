const Category = require('../models/category.model');

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
