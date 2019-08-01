module.exports = (app) => {
    const product = require('../controllers/product.controller');

    app.get('/products', product.findAll);
    app.post('/products', product.create);
};