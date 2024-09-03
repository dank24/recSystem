const express = require('express')
const router = express.Router()

const fs = require('fs')

const userCont = require('../controllers/userCont')

//Signup
router.post('/signup', userCont.userCreatePost)

router.get('/file', userCont.csvFile)

// Login
router.post('/login', userCont.userLoginPost)

//Update Recs
router.put('/onboarduser/:id', userCont.userOnboardPut)
router.put('/recMovie/:id?', userCont.userMovieRecPut)

module.exports = router


