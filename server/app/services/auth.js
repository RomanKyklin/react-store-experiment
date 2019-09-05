const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');

exports.isLoggedIn = (req, res, next) => req.isAuthenticated() || req.path === '/login' ? next() : res.redirect('/login');


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id)
        .then(user => {
            if (user) {
                done(null, user)
            }
        });
});

passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        userModel.find({username})
            .then(users => {
                if (users.length === 0 || !bcrypt.compareSync(password, users[0].password)) {
                    return done(null, false, {"message": "User not found."});
                }
                return done(null, users[0]);
            })
            .catch(error => done(null, false, {"message": error}));
    })
);

exports.passport = passport;