const mongoose = require('mongoose')

mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.DB_URL_TEST : process.env.DB_URL_DEV)
    .then(() => {
        process.env.NODE_ENV === 'dev' && console.log('Successfully connect to database !')
    })
    .catch(() => {
        console.log('Failed connect to database !')
    })