const userModel = require('../models/userModel')
const asyncHander = require('express-async-handler')
const cors = require('cors')

//user Controllers
exports.userCreatePost = asyncHander(
    async(req,res,next) => {

    res.header('Access-Control-Allow-Origin', "*")

        let {userName, userEmail} = req.body

        cors: {
            methods: ['PUT', 'POST', 'GET']   
            origin: '*'       
        }

        console.log(userEmail)
    }
  
/*
        const {userName, email, password} = req.body.toLowerCase()

        const user = await(userModel.findOne({userName:userName}))

        if(user){
            res.status(404).json('user exist')
        }

        if(!user){
            let newUser = new userModel({
                userName: userName,
                userEmail: email,
                userPassword: password
            })
            console.log('new user')
        }
*/

        
    
        
)