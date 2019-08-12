module.exports = (app) => {
    const category = require('../controllers/category.controller');

    app.get('/categories', category.findAll);
    app.post('/categories', category.create);
    app.delete('/category', category.delete);
};