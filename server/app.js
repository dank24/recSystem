const express = require('express')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()



//routes
const userRoutes = require('./routes/userRoutes')

//use
app.use('/signup', userRoutes)
app.use(cors())



//server 
const port = 3021
app.listen(3021, () =>{

    cors: {
        methods: ['PUT', 'POST', 'GET']
        origin: '*'
    }
    
    console.log(`Server Started on Port: ${port}`)
})

//database connect
const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl).then(() =>{
    console.log('DB Connected')
})