const express = require('express')
const router = express.Router()

const fs = require('fs')

const userCont = require('../controllers/userCont')

router.post('/signup', userCont.userCreatePost)
router.get('/signup', (re,res)=>{

})

router.get('/file', userCont.csvFile)

router.post('/login', userCont.userLoginPost)

module.exports = router


