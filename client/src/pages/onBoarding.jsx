import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import papa, { parse } from 'papaparse'
import cors from 'cors'

import moviesMd from '../assets/Data/movies_md.csv'

import MovieCard from '../components/moviesCard.jsx'


import genres from '../assets/Data/genres.js'
import OnBoardCard from '../components/onBoardCards'


const OnBoarding = (props) => {
  
const userId = useParams()
const navigate = useNavigate()


// Variables
const [userPref, setUserPref] = useState([])
const apiKey = 'b0daf648'
let [csvData, setCsvData] = useState([])
let [likedMovies, setLikedMovies] = useState([])
let [recMovies, setRecMovies] = useState([])
let [test, setTest] = useState([])
let [genreArray, setGenreArray] = useState({})
let [appendData, setAppendData] = useState([])



//Function

//    Place Genres Function
function placeGenres(){
  let arr1 = []
  let arr2 = {
    anime: [],
    comedy: [],
    adventure: [],
    fantasy: [],
    romance: [],
    action: [],
    drama: [],
    crime: [],
    thriller: [],
    horror: [],
    sci_fi: [],
    mystery: []
  }
  
if(csvData && test.length <=0 ){
  csvData.map(items =>{

    let re = items.genres.replace(/'/g, '"')
    let newGenre = JSON.parse(re)

    arr1.push({id: items.id, title: items.title, genres: newGenre, imdb_id: items.imdb_id })
  })
  setTest(arr1)
}

if(test){
   test.map(items =>{
    if(items.genres[0]){
      if(items.genres[0].id == 16){
        arr2.anime.push(items)
      }
      if(items.genres[0].id == 35){
        arr2.comedy.push(items)
      }
      if(items.genres[0].id == 12){
        arr2.adventure.push(items)
      }
      if(items.genres[0].id == 14){
        arr2.fantasy.push(items)
      }
      if(items.genres[0].id == 10749){
        arr2.romance.push(items)
      }
      if(items.genres[0].id == 28){
        arr2.action.push(items)
      }
      if(items.genres[0].id == 18){
        arr2.drama.push(items)
      }
      if(items.genres[0].id == 80){
        arr2.crime.push(items)
      }
      if(items.genres[0].id == 53){
        arr2.thriller.push(items)
      }
      if(items.genres[0].id == 27){
        arr2.horror.push(items)
      }
      if(items.genres[0].id == 9648){
        arr2.mystery.push(items)
      }
      if(items.genres[0].id == 878){
        arr2.sci_fi.push(items)
      }
    }
  }) 

  setGenreArray(arr2)
}


}

//    Fetch Movies Function
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



//    Get Recommendations Function
const getRecs = async (array) =>{

  for(let it of array){

    try{
      let fetchApi = await fetch(`http://127.0.0.1:5000/recommend?title=${it.title}`)
    
      let data = await fetchApi.json()

      recMovies.push(data)

  
    } catch (error){
      console.error(error)
    }

  }

}
console.log(recMovies)


//    complete Onboarding Function
async function completeOnboard(send){

  if(likedMovies.length >=10){
    let updateOnboard = fetch(`http://localhost:3021/user/onboarduser/${userId.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':"application/json",
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(data => console.log(data))
    console.log('done')

  let updateMovieRec = fetch(`http://localhost:3021/user/recMovie/${userId.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'applictaion/json'
    },
    body: JSON.stringify(recMovies)
  } ).then(res => res.json()).then(data => console.log(data))
  }

}


//    find out how to push the current values of gArr
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

  if(likedMovies.length >= 10){
    //getRecs(likedMovies)
   // completeOnboard()
  }
}


//    Send Liked Movie Function
function sendLikedMovies(){
  fetch('http://localhost:3021/movies/likedMovies', {
    method: 'POST',
    headers: {
      "accept": "application/json",
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(likedMovies)
  })  
}

//    Get User Preference function
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


//UseEffects

//    Parse CsvFile And Save To State
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

//    Call placeGenre Function
useEffect(() =>{
  placeGenres()
}, [csvData, test])


//    Call fetcHmovies Function
useEffect(() =>{
  if(csvData.length > 1){
    fetchMovies()
  }

}, [csvData, genreArray])



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

        <button onClick={(e) =>{
          props.onBoardData(likedMovies);
          nextBtn()
        }}
          >Next
        </button>
        
      </div>

    </div>
  )
}


export default OnBoarding
