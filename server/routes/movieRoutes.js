const express = require('express')

const router = express.Router()

const movieCont = require('../controllers/movieCont')

router.post('/likedMovies', movieCont.recMovieGet)


module.exports = router