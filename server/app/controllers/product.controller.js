const _ = require('lodash');
const productService = require('../services/product.service');

exports.find = async (req, res) => {
    const id = _.get(req.query, 'id', null);

    if (!id) {
        return res.status(400).send({
            message: "Product id can not be empty"
        });
    }

    try {
        const product = await productService.getProductById(id);
        return res.send(product);
    } catch (e) {
        return res.status(500).send({
            message: e.message || "Error finding product with id " + id
        });
    }
};

exports.findAll = async (req, res) => {
    const page = parseInt(_.get(req.query, 'page', 1));
    const perPage = parseInt(_.get(req.query, 'perPage', 10));
    const filterCategoryId = _.get(req.query, 'filterCategoryId', null);

    try {
        const filter = filterCategoryId ? {category: filterCategoryId} : {};
        const products = await productService.getProducts(filter, perPage, page);
        const productCount = await productService.getProductsCount(filter);
        
        return res.send({
            products,
            page,
            pagesCount: Math.ceil(productCount / perPage),
            total: productCount
        })
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving products."
        });
    }
};

exports.create = async (req, res) => {
    const title = _.get(req.body, 'title', null);
    const sellingPrice = _.get(req.body, 'sellingPrice', null);
    const purchasePrice = _.get(req.body, 'purchasePrice', null);
    const category = _.get(req.body, 'category', null);
    const image = _.get(req.body, 'image', null);

    if (!title || !sellingPrice || !purchasePrice || !category) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    try {
        const product = await productService.createProduct(title, sellingPrice, purchasePrice, category, image);
        return res.send(product);
    } catch (e) {
        return res.status(500).send({
            message: e.message || "Some error occurred while creating the product."
        })
    }
};

exports.change = async (req, res) => {
    const id = _.get(req.body, 'id', null);
    const title = _.get(req.body, 'title', null);
    const sellingPrice = _.get(req.body, 'sellingPrice', null);
    const purchasePrice = _.get(req.body, 'purchasePrice', null);
    const category = _.get(req.body, 'category', null);
    const image = _.get(req.body, 'image', null);

    if (!id || !title || !sellingPrice || !purchasePrice || !category || !image) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    try {
        const product = await productService.changeProduct(id, title, sellingPrice, purchasePrice, category, image);
        return res.send(product);
    } catch (e) {
        return res.status(500).send({
            message: e.message || "Error updating product with id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    const id = _.get(req.body, 'id', null);

    if (!id) {
        return res.status(400).send({
            message: "Product id can not be empty"
        });
    }

    try {
        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).send({
                message: "Product not found with id " + id
            });
        }

        res.status(200).send({
            message: "product removed successfully with id " + id
        })
    } catch (e) {
        return res.status(500).send({
            message: e.message || "Error deleting product with id " + id
        });
    }
};
