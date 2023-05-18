const express = require('express')
const morgan = require('morgan')
const compression = require('compression')

require('dotenv').config()
require('./db/connection')

const app = express()
const router = require('./routes/route')

app.use(express.json())
app.use(morgan('dev'))
app.use(compression({level: 1}))
app.use(router)

module.exports = app