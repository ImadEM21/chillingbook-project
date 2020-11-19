const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

module.exports = (req, res, next) => {
    
    var token = new Cookies(req,res).get('access_token');

    jwt.verify(token, 'RANDOM_WEB_TOKEN', (err, decoded) => {
        if (err) {
            res.status(403).json({message: "L'authentification a échoué"});
        } else {
            next();
        }

    });
};
