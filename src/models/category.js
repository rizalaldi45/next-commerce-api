const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please input category name !'],
    },
}, {timestamps: true})

const Category = mongoose.model('Categorys', CategorySchema)

module.exports = Category;