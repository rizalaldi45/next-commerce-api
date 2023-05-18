const Cart = require('../models/cart')

const validationFormater = require('../middleware/validationErrorFormater')

exports.addCart = async (req, res) => {
    try {
        const item = new Cart(req.body)
        await item.save()
        res.json(item)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

exports.getCart = async (req, res) => {
    const {userId} = req.query
    let query = {}

    if (userId) {
        query = {user: userId}
    }
    
    try {
        await Cart.paginate(
            query,
            {
                page: 1, 
                limit: 10,
                populate: [
                    {path: 'product', select: 'name price stock'},
                    {path: 'user', select: 'name email'}
                ]
            }, 
            function(err, result){
                if (err) {
                    console.log(err);
                }

                if (result) {
                    res.json(result)
                }
            }
        )
    } catch(err) {
        res.status(500).json(validationFormater(err))
    }
}

exports.deleteCartItem = async (req, res) => {
    const {productId} = req.query
    try {
        const cart = await Cart.findOneAndRemove({_id: productId})
        res.json(cart)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}