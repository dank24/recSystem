const userModel = require('../models/userModel')
const asyncHander = require('express-async-handler')
const cors = require('cors')

//user Controllers
exports.userCreatePost = asyncHander(
    async(req,res,next) => {

        let {userName, userPassword, userEmail} = req.body
            let name = userName.toLowerCase()
            let password = userPassword.toLowerCase()
            let email = userEmail.toLowerCase()
    
        let user = await userModel.findOne({userName: name})

        if(user){
            res.status(200).json('user exists')
            console.log('this')
        }
        if(!user){
         let newUser = new userModel({
            userName: name,
            userEmail: email,
            userPassword: password
         })
         await newUser.save()
         res.status(200).json('new user created')
         console.log('saved')
        }

        

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