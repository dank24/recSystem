const asyncHandler = require('express-async-handler')

exports.recMovieGet = asyncHandler(
    async (req,res,next) =>{
   
        let likedMovies = await req.body

        for(let movie of likedMovies){
            let fetchApi = await fetch(`http://127.0.0.1:5000/recommend?title=${movie.title}`)

            const data = fetchApi.json()

            console.log(data)

            
        }
    }
)