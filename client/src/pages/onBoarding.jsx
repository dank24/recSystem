import React, { useEffect, useState } from 'react'
import papa from 'papaparse'
import MovieCard from '../components/moviesCard.jsx'


import genres from '../assets/Data/genres.js'
import OnBoardCard from '../components/onBoardCards'

console.log(genres.data.genres)

//Function
function div(e){
  console.log(e)
}


const card = genres.data.genres.map(it =>{
  let id = it.id
  let name = it.name
  let img = it.Image
  let descr = it.description
  let color = it.color
    return(
      < OnBoardCard 
          key = {id}
          name = {name}
          img = {img}
          descr = {descr}
          color = {color}
          handleClick = {div}
      />
    )
})

const OnBoarding = () => {

  let [csvFie, setCsvFile] = useState('')

   useEffect(() =>{
    fetch('http://127.0.0.1:5000/recommend?title=iron man', {
      method: 'Get',
      headers: {
        "Content-Type":"application/json"
      }
    }).then(res => res.json()).then(data => console.log(data))
  }, []) 

  fetch('http://localhost:3021/user/file',{
    method:'Get'
  })
  .then( res => console.log(res.body.getReader()))



  return (
    <div id='onBoardMainCont'>

    < MovieCard />
      <div id='onBoardFirstDiv'>
  
      </div>
      
      <div id='onBoardSecondDiv'>
        <div id='cardDiv'>
          {card}
        </div>
      </div>

    </div>
  )
}

export default OnBoarding
