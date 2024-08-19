import React, { useEffect } from 'react'
import cors from 'node:cors'


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

   useEffect(() =>{
    fetch('http://127.0.0.1:5000/recommend?title=moana', {
      method: 'Get',
      headers: {
        "Content-Type":"application/json"
      }
    }).then(res => res.json()).then(data => console.log(data))
  }, [])  

  console.log('shhs')

  return (
    <div id='onBoardMainCont'>

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
