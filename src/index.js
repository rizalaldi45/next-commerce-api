const app = require('./app.js')

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Next Commerce API')
})

app.listen(port, () => {
    console.log(`Successfull running on port ${port}`)
})