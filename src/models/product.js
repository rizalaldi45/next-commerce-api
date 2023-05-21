const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const CommentSchema = new mongoose.Schema({
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    text: {
        type: String,
        required: [true, 'Please input comment !']
    },
    rating: {
        type: Number,
        required: [true, 'Please input rating !']
    }
}, {timestamps: true})

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    picture: {
        type: Buffer,
    },
    stock: {
        type: Number,
    },
    favoriteBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorys'
    },
    comment: [CommentSchema]
}, {timestamps: true})

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Products', ProductSchema)

module.exports = Product;