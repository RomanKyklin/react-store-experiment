const mongoose = require('mongoose');

const UserInfo = mongoose.Schema({
    username: String,
    password: String,
    email: String

}, {
    timestamps: true
});

module.exports = mongoose.model('userInfo', UserInfo, 'userInfo');