const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = schema({
    userName: {
        type: String,
        required: [true, 'No Username'],
        minLenght: 3,
    },
    userEmail: {
        type: String,
        required: [true, 'No Email']
    },
    userPassword:{
        type: String,
    },
    userDOB:{
        type: String
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel