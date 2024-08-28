import React, { useEffect, useState } from 'react'
import papa, { parse } from 'papaparse'
import cors from 'cors'

import moviesMd from '../assets/Data/movies_md.csv'

import MovieCard from '../components/moviesCard.jsx'


import genres from '../assets/Data/genres.js'
import OnBoardCard from '../components/onBoardCards'


const OnBoarding = () => {
  
  cors(
    {
      origin: '*',
      methods: ['PUT', 'POST', 'GET']
    }
  )


// Variables
const [userPref, setUserPref] = useState([])
const apiKey = 'b0daf648'
let [csvData, setCsvData] = useState([])
let [likedMovies, setLikedMovies] = useState([])
let [recMovies, setRecMovies] = useState([])
let [genreArray, setGenreArray] = useState([])
let [appendData, setAppendData] = useState([])



//Function
//                      FetchM Movies Function
const fetchMovies = async () =>{
  let aData = []

  for(let i = 0; i < 3; i++){

      let randomIndex = Math.floor(Math.random()*csvData.length)
    try{
      let imdb = csvData[randomIndex].imdb_id

      let apiFetch = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdb}`)
      let data = await apiFetch.json();

      aData.push({name: data.Title, img: data.Poster, imdbID: data.imdbID, key: data.imdbID})

    } catch (error){
      console.error(error)
    }
  }
  setAppendData(aData)
}




//                      Get Recommendations Function
const getRecs = async (array) =>{

  for(let it of array){
    let fetchApi = await fetch(`http://127.0.0.1:5000/recommend?title=${it.title}`)
    
    let data = await fetchApi.json()

    recMovies.push(data)
  }

}



//                       Get User Preference function
let array = []
let [click, setClick] = useState(false)

let [gArr, setGArr] = useState([])
let [mArr, setMArr] = useState([])
let [nArr, setNArr] = useState([])
let [count, setCount] = useState(0)

function getUserPreference(title, e, id, click) {
  let choice = e.target.id
  let p = e.currentTarget.childNodes[1].childNodes

  function removeElement(arr, id){
    let index = arr.findIndex(it => it.imdbID == id)
    if(index !== -1){
      arr.splice(index, 1)
    }
  }

  function clickTarget(arr){

    if(!arr.some(it => it.imdbID == id)){
      arr.push({title: title, imdbID: id})

      setCount(prev =>{
        return prev+1   
      })
    }
      e.target.style = 'border: 2px solid white'
      console.log(arr)
    
  }

  if(choice == 'goodP' ){

    removeElement(mArr, id)
    removeElement(nArr, id)
    clickTarget(gArr)
  }

  if(choice == 'mehP'){

    removeElement(gArr, id)
    removeElement(nArr, id)
    clickTarget(mArr)
  }
  if(choice == 'neverP'){

    removeElement(gArr, id)
    removeElement(mArr, id)
    clickTarget(nArr)
  }

  p.forEach(e => {
    if(e.tagName == 'P' && e.id != choice){
      e.style = 'border: 1px solid black'
    }
  })

}



//find out how to push the current values of gArr
function nextBtn() {

  if(count >= 3){
    gArr.map(it =>{
      if(!likedMovies.some(movies => movies.imdbID == it.imdbID)){
        likedMovies.push(it)
      }
    })
    fetchMovies()
  }

  setGArr([])
  
  console.log(likedMovies)
  setCount(0)

  setClick(!click)

  if(likedMovies.length == 5){
    getRecs(likedMovies)
  }
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

//

// Effects to set appendData
useEffect(() =>{
  if(csvData.length > 1){
    fetchMovies()
  }

}, [csvData])

const [a, setA] = useState(
  appendData.map(it =>{
    return < OnBoardCard 
      name = {it.name}
      img = {it.img}
      handleClick = {getUserPreference}
      imdbID = {it.imdbID}
      click = {click}
    />
  })
)
let s = appendData.map(it =>{
  return < OnBoardCard
            key = {it.key}
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
        <button onClick={nextBtn}>Next</button>
        
      </div>

    </div>
  )
}


export default OnBoarding
