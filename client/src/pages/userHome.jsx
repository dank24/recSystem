import React from "react";

import '../assets/styles.css'
import MiniCard from "../components/miniCard";

import { useState, useEffect } from "react";
import SideBar from "../components/sideBar";

function UserHome(){
// Variables 

    let movieName = ['harry potter', 'divergent', 'inside out', 'inside out 2','speed', 'john wick 3']
    const apiKey = 'b0daf648'


// Functions 

   let append = movieName.map(it =>{
    const [apiData, setApiData] = useState({
        Poster: '',
        Title: ''
    })

        useEffect(() =>{
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${it}`, {
                 method: 'GET',
            })
            .then(res => res.json())
            .then(data => setApiData(prev =>{
                return {
                    Poster: data.Poster,
                    Title: data.Title,
                    imdbID: data.imdbID
                }
            }))
            .then(console.log(apiData))
        }, [apiKey])
        return < MiniCard 
                  key = {apiData.imdbID}
                  poster = {apiData.Poster}
                  title = {apiData.Title}
                  />
        })

 console.log('this')


    return(
        <div id="userHomeMainCont">

            <div id="userHomeFirstDiv">
                <SideBar />
            </div>

            <div id="userHomeSecondDiv">

                <div id="userNav">
                    <div>
                        <h1>Top</h1>
                    </div>
                    <div>
                        <button>Movies</button>
                        <button>Music</button>
                    </div>

                    <div>
                        <h2>Your Recs</h2>
                    </div>
                </div>

                <div id="userCardDiv">
                {append}
                </div>

            </div>

        </div>
    )
}

export default UserHome