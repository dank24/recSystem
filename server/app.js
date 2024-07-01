const express = require('express')

const app = express()

//server 
const port = 3021
app.listen(3021, () =>{
    console.log(`Server Started on Port: ${port}`)
})

//