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

            res.status(200).json({message: `User ${userName} Exists`})
        }

        if(!user){
         let newUser = new userModel({
            userName: name,
            userEmail: email,
            userPassword: password
         })

         await newUser.save()
         res.status(200).json({message: `New User: ${userName} Created`})
         console.log('Saved user')
        }

    }         
)

exports.userLoginPost = asyncHander(
    async(req,res,next) =>{
        let {userName, userPassword} = req.body
        let name = userName.toLowerCase();
        let password = userPassword.toLowerCase()
      
        let user = await userModel.findOne({userName: name}) ||
                   await userModel.findOne({userEmail: name})

        if(user){
            res.status(200).json({message: 'Welcome'})
        }
        if(!user){
            res.status(400).json({Message: `User Not Found`})
        }
    }
)
  