import React from 'react'
import {Route, Routes, Link} from 'react-router-dom'

import '../assets/styles.css'


const sideBar = () => {
  return (
    <div id='sideBarMainCont'>

      <div id='sideBarFirstDiv'>
        <div id='homeDiv'>Home</div>
        <div>Search</div>
      </div>

      <div id='sideBarSecondDiv'>
        <div id='youRDiv'>Your Recs</div>
        <div>Recs by Mood</div>
        <div>Trending Now</div>
        <div>Find by Similar</div>
        <div>Recs by Genre</div>
        <div>Recs by Genre</div>
        <Link to='http://www.google.com'>j</Link>
      </div>

    </div>
  )
}

export default sideBar
