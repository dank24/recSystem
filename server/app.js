const express = require('express')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const app = express()



//routes
const userRoutes = require('./routes/userRoutes')
const moviesRoutes = require('./routes/movieRoutes')

//use
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT']
}))
app.use('/user', userRoutes)
app.use('/movies', moviesRoutes)



//server 
const port = 3021
app.listen(3021, () =>{


    console.log(`Server Started on Port: ${port}`)
})


//database connect
const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl).then(() =>{
    console.log('DB Connected')
})


//serve .csv file
