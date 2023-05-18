const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input name !'],
    },
    email: {
        type: String,
        required: [true, 'Please input email !'],
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid !')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Please Input password !'],
        trim: true,
        validate(value){
            if (value.length < 6) {
                throw new Error('Password at least have 6 character !')
            }
        }
    },
    token : {
        type : String
    },
    refreshToken : {
        type : String
    }
}, {timestamps: true})

UserSchema.methods.generateToken = async function(){
    const user = this

    const token = await jwt.sign(
        {id:user._id}, 
        process.env.JWT_SECRET,
        { expiresIn : "12h"}
    )
    const refresh = await jwt.sign(
        {id:user._id}, 
        process.env.JWT_SECRET_REFRESH, 
        { expiresIn : "1d" }
    )
    
    user.token = token
    user.refreshToken = refresh
    await user.save()
}

UserSchema.statics.userLogin = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email })

    if (!user) {
        throw Error('User not found')
    }

    const auth = await bcrypt.compare(password, user.password)

    if (!auth) {
        throw Error('Password not correct')
    }

    return user;
}

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
        next()
    }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User