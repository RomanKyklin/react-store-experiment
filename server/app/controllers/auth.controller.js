exports.login = (req, res) => {
    return res.redirect("/client");
};

exports.logout = (req, res) => {
    req.logout();
    return res.send("logout success!");
};