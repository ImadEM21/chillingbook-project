const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

module.exports = (req, res, next) => {
    
    var token = new Cookies(req,res).get('access_token');

    jwt.verify(token, '2hU8pMq8OVN2mlJz9KwNGfksEWtIIGOJZNxm3pkoW3c88i3NhMgjE8dJHPY5DSOGDMnraXhhwUNxLuAK29WrecXKuUjqOscJcZhq', (err, decoded) => {
        if (err) {
            res.status(403);
        } else {
            next();
        }

    });
};