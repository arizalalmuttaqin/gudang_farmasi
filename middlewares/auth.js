const cekLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};

module.exports = { cekLogin };