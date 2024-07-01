import react from 'react'
import {Link} from 'react-router-dom'

import NavBar from '../components/navBar'


const Homepage = () =>{

    return(
        <div id='homePageMainCont'>
            <div className='homePageFirstDiv'>
                < NavBar />
            </div>

            <div className='homePageSecondDiv'>
                <div id='welcomeDiv'>
                    <div>
                        <h2>Welcome.</h2>
                        <div>
                            <p>Unleash Your Next Obsession</p>
                            <p>Discover Movies & Music You'll Love.</p>  
                        </div>
                        <button>Get Started</button>
                    </div>
                </div>

                <div id='descDiv'>
                    <h1>second</h1>
                </div>
            </div>
        </div>
    )
}

export default Homepage