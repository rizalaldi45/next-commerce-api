const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const categoryController = require('../controllers/categoryController')

const authorize = require('../middleware/authorize')

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.post('/product', authorize, productController.addProduct)
router.get('/product', authorize, productController.getProduct)
router.patch('/product/favorite', authorize, productController.addProductFavorite)
router.patch('/product/comment', authorize, productController.addProductComment)

router.post('/cart', authorize, cartController.addCart)
router.get('/cart', authorize, cartController.getCart)
router.delete('/cart', authorize, cartController.deleteCartItem)

router.post('/category', authorize, categoryController.addCategory)

module.exports = router