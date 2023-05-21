const express = require('express')
const multer = require('multer')

const router = express.Router()

const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const categoryController = require('../controllers/categoryController')

//Mutler file handle
const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.endsWith('.jpeg')) {
            return callback(new Error('File should jpeg format !'))
        }
        callback(undefined, true)
    }
})


const authorize = require('../middleware/authorize')

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.post('/product', authorize, upload.single('image'), productController.addProduct)
router.get('/product', authorize, productController.getProduct)
router.patch('/product/favorite', authorize, productController.addProductFavorite)
router.patch('/product/comment', authorize, productController.addProductComment)

router.post('/cart', authorize, cartController.addCart)
router.get('/cart', authorize, cartController.getCart)
router.delete('/cart', authorize, cartController.deleteCartItem)

router.post('/category', authorize, categoryController.addCategory)

module.exports = router