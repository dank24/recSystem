const userModel = require('../models/userModel')
const asyncHander = require('express-async-handler')
const cors = require('cors')
const fs = require('fs')
const { send } = require('process')

//user Controllers
exports.userCreatePost = asyncHander(
    async(req,res,next) => {

        let {userName, userPassword, userEmail} = req.body
            let name = userName.toLowerCase()
            let password = userPassword.toLowerCase()
            let email = userEmail.toLowerCase()
    
        let user = await userModel.findOne({userName: name})

        if(user){
            console.log(user)
        }

        if(!user){
         let newUser = new userModel({
            userName: name,
            userEmail: email,
            userPassword: password,
            onBoarded: false
         })

         await newUser.save()
         res.status(200).json({message: `New User: ${userName} Created`})
         console.log('Saved user')
        }

    }         
)

exports.csvFile = asyncHander(
    async (req, res, next) =>{
        csvFile = fs.readFile('/home/dans/Downloads/pyp/archive/movies_md.csv', 'utf-8', (err, data) =>{
            if(err) {
                return res.status(500).send(err)
            }
            res.send(data)
        })
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
            if(password === user.userPassword){
                res.status(200).json({message: 'Welcome', user: user})
            } else {
                res.status(200).json({message: 'Incorrect Password'})
            }
        }
        if(!user){
            res.status(400).json({Message: `User Not Found`})
        }
    }
)
  
exports.userOnboardPut =asyncHander(
    async(req,res,next) =>{
        let userId = req.params.id
        
        try{

            let s = await userModel.findByIdAndUpdate(userId, {onBoarded: true})
            res.status(200).json({Success: 'onboarded'})
        } catch (error) {
            res.status(500).json({Error: 'Failed to onboard'})
        }
    }
)

exports.userMovieRecPut = asyncHander(
    async(req,res,next) =>{
        let userId = req.params.id
        let recievedRecs = req.body

        try{
           let recs = await userModel.findByIdAndUpdate(userId, {userMovieRecs: recievedRecs})
        } catch (error) {
            res.status(500).json({error: 'Couldnt update recommendations'})
        }
    }
)