const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

const User = require('../models/User');


exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({message: "Utilisateur pas trouvé!"});
        }
        bcrypt.compare(req.body.password, user.password, async valid => {
            if (!valid) {
                return res.status(401).json({message: "Mot de passe incorrecte"});
            }
            
            const token = jwt.sign(
                {userId: user._id},
                '2hU8pMq8OVN2mlJz9KwNGfksEWtIIGOJZNxm3pkoW3c88i3NhMgjE8dJHPY5DSOGDMnraXhhwUNxLuAK29WrecXKuUjqOscJcZhq',
                {expiresIn: '3h'}
            );
            new Cookies(req, res).set('access_token', token, {
                httpOnly: true,
            });
            res.send({
                access_token: token
            });
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getSignUp = (req, res) => {
    res.render('signup', {user: new User() });
};

exports.getLogIn = (req, res) => {
    res.render('login');
};