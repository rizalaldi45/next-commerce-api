const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        default: 1,
    }
}, {timestamps: true})

CartSchema.plugin(mongoosePaginate);

const Cart = mongoose.model('Carts', CartSchema)

module.exports = Cart;