const { Router } = require('express')
const router = Router();

const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const verifyToken = require('./verifyToken')

router.route('/signup').post(authController.signup)

router.route('/signin').post(authController.signin)

router.route('/logout').get(authController.logout)

router.route('/products')
    .get(verifyToken, productController.index)
    .post(verifyToken, productController.new)

router.route('/product/:id')
    .get(verifyToken, productController.view)
    .put(verifyToken, productController.update)
    .delete(verifyToken, productController.delete)

module.exports = router;