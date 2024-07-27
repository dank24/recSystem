const express = require('express')
const router = express.Router()

const userCont = require('../controllers/userCont')

router.post('/', userCont.userCreatePost)
router.get('/',(req, res) =>{
    res.send('This is the last time')
})


module.exports = router