const User = require('../../models/user')
const Product = require('../../models/product')

const dataRegister = {
    email: "test@gmail.com",
    password: "123123",
    name: "test",
}

const dataAddProduct = {
    name: "Test Product",
    price: 100000,
    description: "Test Product Description",
    stock: 10,
}

const addUser = async () => {
    try {
        const data = new User(dataRegister)
        await data.generateToken()
        await data.save()
        return data
    } catch(err) {
        throw Error(err)
    }
}

const addProduct = async () => {
    try {
        const data = new Product(dataAddProduct)
        await data.save()
        return data
    } catch(err) {
        throw Error(err)
    }
}

module.exports = {
    addUser,
    addProduct,
}