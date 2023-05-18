const Category = require('../models/category')

const validationFormater = require('../middleware/validationErrorFormater')

exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.json(category)
    } catch(err) {
        res.status(500).json(validationFormater(err))
    }
}