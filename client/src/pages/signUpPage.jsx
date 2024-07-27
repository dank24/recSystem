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
    
    const [sFormData, setSFormData] = useState(pageData)

        let [nextInp, setNextInp] = useState(true)

//functions
   const nextPage = (b) => {
        if(pageData.userName && pageData.userEmail){
            b.preventDefault()
            setNextInp(false);
        }
        if(pageData.userPassword && pageData.userCPassword){

            setSFormData(pageData)

            handleSubmit()        
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
                method: 'POST',
                body: JSON.stringify(sFormData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            }).then(console.log('success'))
    

        console.log(pageData)
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
                        <p>Enter a Password</p>
                        <fieldset>
                            <legend>Password</legend>
                            <input 
                                id='password' required 
                                name='userPassword' placeholder='Password' 
                                value={pageData.userPassword} onChange={handleCHange}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Confirm Password</legend>
                            <input 
                                id='cPassword' required 
                                name='userCPassword'  placeholder='Confirm Password' 
                                value={pageData.userCPassword} onChange={handleCHange}
                            />
                        </fieldset>
                    </div>
                    }
                        
                        <button 
                            type='submit'
                            id='nextBtn'
                            onClick={nextPage}
                         >Next</button>
                        
                    </form>
                </section>
            </div>
        </div>
    )
}
export default SignUp