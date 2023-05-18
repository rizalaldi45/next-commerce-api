const jwt = require('jsonwebtoken')
const Users = require('../models/user')

const authorize = async (req, res, next) => {
    try {
        const userToken = req.headers.authorization
        const verify = await jwt.verify(userToken, process.env.JWT_SECRET)

        const user = await Users.findOne({_id: verify.id})
                  
        if (!user) {
            throw Error('pleasse signup to use this API !')
        }

        next()
    } catch (err) {
        if (err.message === 'jwt expired') {
            res.json({ message: 'token expired !' })
        }
    }
}

module.exports = authorize