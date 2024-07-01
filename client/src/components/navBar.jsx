import react from 'react'
import { Link } from 'react-router-dom'

const NavBar = () =>{

    return(
        <div id='navBarMainCont'>

            <div className='navBarFirstDiv'>
                <h3>dRecs</h3>
            </div>

            <div className='navBarSecondDiv'>
                <nav>
                    <a><li>About</li></a>
                    <Link to='./signup'>SignUp</Link>
                    <li>Music</li>
                    <li>Contact</li>
                </nav>
            </div>

        </div>
    )
}

export default NavBar