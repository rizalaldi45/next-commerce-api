const Product = require('../models/product')

exports.addProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body, 
            picture: req.file.buffer
        })
        await product.save()
        res.json(product)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

exports.getProduct = async (req, res) => {
    const {keyword, sorting} = req.query
    let query;
    let sort;
    if (keyword) {
        query = {name: new RegExp(`${keyword}`)}
    }
    if (sorting) {
       sort = {name: sorting}
    }
    if (!req.query) {
        query = {}
    }
    try {
        await Product.paginate(
            query, 
            {
                page: 1, 
                limit: 10, 
                sort,
                populate: [
                    {path:'favoriteBy', select: 'name email'},
                    {path:'comment.commentBy', select: 'name email'},
                    {path:'category', select: 'name'},
                ]
            }, 
            function(err,result){
                if (err) {
                    console.log(err);
                }
                
                if (result) {
                    res.json(result)
                }
            }
        )
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

exports.addProductFavorite = async (req, res) => {
    const {userId, productId} = req.query
    try {
        const favoriteProduct = await Product.findOne({_id: productId})
        if (!favoriteProduct) {
            throw Error('product not exist')
        }
        const alreadyFavorite = favoriteProduct.favoriteBy.filter(e => e == userId)

        let query;

        if (alreadyFavorite.length === 0) {
            query = {$push: {favoriteBy: userId}}
        } else {
            query = {$pull: {favoriteBy: userId}}
        }

        const product = await Product.findOneAndUpdate(
            {_id: productId}, 
            query,
            {new: true},
        ).populate('favoriteBy', 'name')

        res.json(product)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

exports.addProductComment = async (req, res) => {
    const {userId, productId, text, rating} = req.body
    try {
        const product = await Product.findOneAndUpdate(
            {_id: productId}, 
            {$push: 
                {comment: {
                    commentBy: userId,
                    text,
                    rating,
                }
            }},
            {new: true}
        ).populate('comment.commentBy favoriteBy', 'name email')
        
        res.json(product)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}
