const express = require('express')
const router = express.Router()

const userCont = require('../controllers/userCont')

router.post('/signup', userCont.userCreatePost)
router.post('/login', userCont.userLoginPost)

module.exports = router