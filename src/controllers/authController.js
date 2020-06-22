const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const {fullName, email, password} = req.body;

    const user = new User({
        fullName,
        email,
        password
    });
    const salt = bcrypt.genSalt(10);
    user.password = bcrypt.hash((password, salt));

    const userMaster = User.findOne({ email: req.body.email })
    if (userMaster) {
        res.status(409).send({ auth: false, message: 'This email is already registered'})
    } else {
        user.save();    
        
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: '24h'
        });
        res.status(200).json({ auth: true, token });
    }
}

exports.signin = (req, res) => {
    let user = User.findOne({ email: req.body.email })
    if(!user) {
        return res.status(404).send({ auth: false, message: "The email doesn't exist"})
    }
    let validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(401).send({ auth: false, token: null, message: 'Unauthorized'});
    }
    let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: '24h'
    });
    res.status(200).json({ auth: true, token });
}

exports.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null});
}