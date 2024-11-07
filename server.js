const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const cors = require('cors')
const User = require('./Model/table')
const userRouter = require('./Router/UserRouter')
const Port = 3500
const authRouter = require('./Router/authRoter')


// console.log(process.env.mongodbUrl)
mongoose.connect(process.env.mongodbUrl)

    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log('data base doesnt connected ' + err)
    })

const app = express()

app.use(cors({
    origin : 'http://localhost:3001'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)
app.use(authRouter)

// Dummy Sample
// app.post('/', (req, res) => {
//     const body = req.body
//     res.send(body)
// })


app.listen(Port, () => {
    console.log('Port is Listening on ' + Port)
})

