import React, { useEffect, useState } from 'react'
import papa, { parse } from 'papaparse'

import moviesMd from '../assets/Data/movies_md.csv'

import MovieCard from '../components/moviesCard.jsx'


import genres from '../assets/Data/genres.js'
import OnBoardCard from '../components/onBoardCards'

console.log(genres.data.genres)

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

const apiKey = 'b0daf648'
let [csvData, setCsvData] = useState()
let [append, setAppend] = useState()
let s;

//Function
  
  function parseCsv() {
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


  }

  function getMoviesForOnBoard() {
    useEffect(() =>{
      for(let i = 1; i < 10; i++){
        if(csvData){
          let m = csvData[i].imdb_id
          
         fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${m}`,{
            method: 'GET'
          })
          .then(res => res.json())
          .then(data => {
            return < OnBoardCard 
              img = {data.Poster}
              name = {data.Title}
            />
            
          })
        }
  
      }
    }, [])


  }

  // Run Funcions
parseCsv()
getMoviesForOnBoard()


  return (
    <div id='onBoardMainCont'>
{append}
  
    </div>
  )
}

export default OnBoarding
