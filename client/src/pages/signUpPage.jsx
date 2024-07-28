import react from 'react'
import { useState, useEffect } from 'react'

import '../assets/styles.css'

import NavBar from '../components/navBar'

const SignUp = () =>{

//variables
    const [pageData, setPageData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userCPassword: '',
    })

    let [nextInp, setNextInp] = useState(true)
    let [passText, setPassText] = useState()

//functions
   const btnAction = (b) => {
        if(pageData.userName && pageData.userEmail){
            b.preventDefault()
            setNextInp(false);
        }
        if(pageData.userPassword && pageData.userCPassword){
            if(pageData.userPassword == pageData.userCPassword){
                handleSubmit()
            } else{
                setPassText('the passwords do not match')
            }
        }

    }

    const handleCHange = (e) =>{
        let {name, placeholder, value} = e.target
        setPageData(prev =>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

const handleSubmit = () =>{

    fetch('http://localhost:3021/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        },
        body: JSON.stringify(pageData)
    })
    .then(console.log('success'))
    .catch(error => console.log(error))
    
}

 
    return(

        <div id='signUpMainCont'>

            <div id='signUpFirstDiv'>

                <section id='sFormSec'>
                    <form id='sForm' method='post' onSubmit={handleSubmit}>
                        <h2>Welcome, Create a Drec Account</h2>
     
                    
                    { nextInp == true &&
                    <div> 
                        <p>Enter a Name and an Email</p>
                        <fieldset>
                            <legend>UserName</legend>
                            <input 
                                id='userName' 
                                name='userName' placeholder='User Name' 
                                value={pageData.userName} onChange={handleCHange}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Email</legend>
                            <input 
                                id='email' 
                                name='userEmail' placeholder='Email' 
                                value={pageData.userEmail} onChange={handleCHange}
                            />
                        </fieldset>

                    </div>
                    }

                    {!nextInp && 
                    
                     <div>
                        {passText ? <p>{passText}</p>: <p>Enter a Password</p>}
                        <fieldset>
                            <legend>Password</legend>
                            <input 
                                id='password' required type='password'
                                name='userPassword' placeholder='Password' 
                                value={pageData.userPassword} onChange={handleCHange}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Confirm Password</legend>
                            <input 
                                id='cPassword' required  type='password'
                                name='userCPassword'  placeholder='Confirm Password' 
                                value={pageData.userCPassword} onChange={handleCHange}
                            />
                        </fieldset>
                    </div>
                    }
                        
                        <button 
                            type='submit'
                            id='nextBtn'
                            onClick={btnAction}
                         >Next</button>
                        
                    </form>
                </section>
            </div>
        </div>
    )
}
export default SignUp