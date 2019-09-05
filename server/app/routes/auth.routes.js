const passport = require("passport");

module.exports = (app) => {
    const auth = require('../controllers/auth.controller');

    app.get('/logout', auth.logout);
    app.post('/login', passport.authenticate("local-login"), auth.login);
};