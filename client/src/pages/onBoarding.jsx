import React, { useEffect, useState } from 'react'
import papa, { parse } from 'papaparse'

import moviesMd from '../assets/Data/movies_md.csv'

import MovieCard from '../components/moviesCard.jsx'


import genres from '../assets/Data/genres.js'
import OnBoardCard from '../components/onBoardCards'


const OnBoarding = () => {
  
/*

   useEffect(() =>{
    fetch('http://127.0.0.1:5000/recommend?title=iron man', {
      method: 'Get',
      headers: {
        "Content-Type":"application/json"
      }
    }).then(res => res.json()).then(data => console.log(data))
  }, []) 


*/
// Variables
const [userPref, setUserPref] = useState([])

const apiKey = 'b0daf648'
let [csvData, setCsvData] = useState([])

let [genreArray, setGenreArray] = useState([])

let [appendData, setAppendData] = useState([])



//Function
let array = []
let [click, setClick] = useState(false)

function getUserPreference(e, id, click) {
  let choice = e.target.id

  if(choice == 'goodP' && !click){
    array.push(id)
  }
  console.log(array)


  setClick(!click)
  console.log(click)

}


//UseEffects
// effects to parse The csvFile
useEffect(() =>{
  fetch(moviesMd)
  .then(res => res.text())
  .then(data =>{
      papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => setCsvData(results.data) ,
      error: error => console.error(error),
    })   
  })

}, [])

// Effects to set appendData
useEffect(() =>{
  if(csvData.length > 1){
    const fetchMovies = async () =>{
      let aData = []

      for(let i = 0; i < 3; i++){
        try{
          let imdb = csvData[i].imdb_id

          let apiFetch = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdb}`)
          let data = await apiFetch.json();

          console.log(data)
          aData.push({name: data.Title, img: data.Poster, imdbID: data.imdbID})

        } catch (error){
          console.error(error)
        }
      }
      setAppendData(aData)
    }

    fetchMovies()
  }

}, [csvData])


let s = appendData.map(it =>{
  return < OnBoardCard
            name = {it.name}
            img = {it.img}
            handleClick = {getUserPreference}
            imdbID = {it.imdbID}
            click = {click}
  />
})

  // Run Funcions


//if(csvData.length >1) {console.log(csvData)}
//if(appendData.length >1){console.log(appendData)}

  return (
    <div id='onBoardMainCont'>
      
      <div id='onBoardFirstDiv'>
        {appendData .length > 2 ? s : <p>not</p> }
        
      </div>
  
    </div>
  )
}


export default OnBoarding
