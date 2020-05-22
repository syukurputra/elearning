const { Router } = require('express')
const router = Router();

const User = require('../models/userModel')
const verifyToken = require('./verifyToken')

const jwt = require('jsonwebtoken')
const config = require('../config')

const productController = require('../controllers/productController')

router.post('/signup', async(req, res) => {
    try{
        const {fullName, email, password} = req.body;

        const user = new User({
            fullName,
            email,
            password
        });
        user.password = await user.encryptPassword(password);

        const userMaster = await User.findOne({ email: req.body.email })
        if (userMaster) {
            res.status(409).send({ auth: false, message: 'This email is already registered'})
        } else {
            await user.save();    
            
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: '24h'
            });
            res.status(200).json({ auth: true, token });
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({message : 'There was a problem registering your user'});
    }
});

router.route('/products')
    .get(productController.index)
    .post(productController.new)

router.route('/product/:id')
    .get(productController.view)
    .put(productController.update)
    .delete(productController.delete)

router.post('/signin', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            return res.status(404).send({ auth: false, message: "The email doesn't exist"})
        }
        const validPassword = await user.validatePassword(req.body.password, user.password);
        if(!validPassword) {
            return res.status(401).send({ auth: false, token: null, message: 'Unauthorized'});
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: '24h'
        });
        res.status(200).json({ auth: true, token });
    } catch (e) {
        console.log(e)
        res.status(500).send({message : 'There was a problem signin'});
    }
});

router.get('/dashboard', (req, res) => {
    res.json('dashboard');
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null});
});

module.exports = router;