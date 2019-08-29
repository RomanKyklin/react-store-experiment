module.exports = (app) => {
    const product = require('../controllers/product.controller');

    app.get('/api/products', product.findAll);
    app.get('/api/product', product.find);
    app.post('/api/products', product.create);
    app.put('/api/products', product.change);
    app.delete('/api/product', product.delete);
};