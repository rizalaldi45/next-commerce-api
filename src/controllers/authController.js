
const User = require('../models/user')

const validationFormater = require('../middleware/validationErrorFormater')

exports.register = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.generateToken()
        await user.save()
        res.json(user)
    } catch(err) {
        res.status(500).send(validationFormater(err))
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.userLogin(req.body)
        await user.generateToken()
        res.json(user)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}