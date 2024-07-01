import react from 'react'
import { useState, useEffect } from 'react'

import '../assets/styles.css'

import NavBar from '../components/navBar'

const SignUp = () =>{

        let [name, setName] = useState('')
        let [email, setEmail] = useState('')
        let [password, setPassword] = useState('')
        let [confirmP, setConfirmP] = useState('')
        
        let [nextInp, setNextInp] = useState(true)


   const nextInfo = (b) => {
        b.preventDefault()
        if(name && email){
            setNextInp(false)
            console.log(nextInp)
        }
    }
 
    return(

        <div id='signUpMainCont'>

            <div id='signUpFirstDiv'>

                <section id='sFormSec'>
                    <form id='sForm' method='post'>
                        <h2>Welcome, Create a Drec Account</h2>
                    
                    {!nextInp && <p>Enter a Password</p>}
                    {nextInp && <p>Enter a Name and an Email</p>}
        
                    
                    { nextInp == true &&
                    <div> 
                        <fieldset>
                            <legend>UserName</legend>
                            <input id='userName' name='userName' placeholder='User Name' required type='text' 
                                onChange={e =>{
                                    setName(e.target.value)
                                    console.log(name)
                                }}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Email</legend>
                            <input id='email' name='email' type='email' required placeholder='Email'
                                onChange={e =>{
                                    setEmail(e.target.value)
                                    console.log(email)
                                }}
                            />
                        </fieldset>

                    </div>
                    }

                    {!nextInp && 
                     <div>
                        <fieldset>
                            <legend>Password</legend>
                            <input id='password' name='password' placeholder='Password' required 
                                onChange={e =>{
                                    setPassword(e.target.value)
                                }}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Confirm Password</legend>
                            <input placeholder='Confirm Password' required 
                                onChange={e =>{
                                    setConfirmP(e.target.value)
                                }}
                            />
                        </fieldset>
                    </div>
                    }
                        
                        <button id='nextBtn'
                         onClick={nextInfo}
                         >Next</button>
                        
                    </form>
                </section>
            </div>
        </div>
    )
}
export default SignUp