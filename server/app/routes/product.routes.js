module.exports = (app) => {
    const product = require('../controllers/product.controller');

    app.get('/products', product.findAll);
    app.get('/product', product.find);
    app.post('/products', product.create);
    app.put('/products', product.change);
    app.delete('/product', product.delete);
};