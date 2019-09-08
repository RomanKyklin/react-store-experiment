const userModel = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');

exports.create = (req, res) => {
    const username = _.get(req.body, 'username', null);
    const email = _.get(req.body, 'email', null);
    const password = _.get(req.body, 'password', null);

    if (!username || !email || !password) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    const user = new userModel({
        username: username,
        email: email,
        password: bcrypt.hashSync(password),
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });

};