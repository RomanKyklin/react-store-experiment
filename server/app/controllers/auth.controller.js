exports.login = (req, res) => {
    return res.send({
        success: true
    });
};

exports.logout = (req, res) => {
    req.logout();
    return res.redirect('/login');
};