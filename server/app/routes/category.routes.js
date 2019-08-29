module.exports = (app) => {
    const category = require('../controllers/category.controller');

    app.get('/api/categories', category.findAll);
    app.post('/api/categories', category.create);
    app.delete('/api/category', category.delete);
};