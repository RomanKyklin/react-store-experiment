module.exports = (app) => {
    const user = require('../controllers/user.controller');

    app.post('/api/users', user.create);
};