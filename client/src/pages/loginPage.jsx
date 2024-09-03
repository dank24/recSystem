import react from "react";
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import '../App.css'

import UserHome from "./userHome";

const LoginPage = (props) =>{

    const [pageData, setPageData] = useState({
        userName: '',
        userPassword: '',
        dbUser: {}
    })
    const navigate = useNavigate()

//Functions
const handleChange = (e) =>{
    let {name, value, placeholder} = e.target
    setPageData(prev =>{
        return {
            ...prev,
            [name]: value
        }
    })
}

//       Function handle Submit
const handleSubmit = (e) =>{
    
    let login = fetch('http://localhost:3021/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pageData)
    }).then(res => res.json())
      .then(data => {
        if(data.message == 'Welcome'){
            console.log(data.user)
            setPageData(prev =>{
                return {
                    ...prev,
                    dbUser: data.user
                }
            })
        } else if(data.message == 'Incorrect Password'){
            console.log('incorrect password')
        }

      })
      .catch(error => console.error(`Error: ${error}`))
} 
// useEffects to handle navigation
useEffect(() =>{
    if(pageData.dbUser.onBoarded == true){
        navigate('/userhome')
    } else if( pageData.dbUser.onBoarded == false){
        navigate(`/onboarding/${pageData.dbUser._id}`)
    }
}, [pageData.dbUser,])


    return(
        <div id="loginMainCont">

            <div id="loginFirstDiv">

            <section id="lFormSec">

                <form id="lForm" >
                    <h3>Login</h3>

                    <fieldset>
                        <legend>UserName or Email</legend>
                         <input 
                            id="userName" name="userName"
                            placeholder="UserName"  value={pageData.userName}    
                            onChange={handleChange}                  
                         />                      
                    </fieldset>

                    <fieldset>
                        <legend>Password</legend>
                        <input 
                            id="userPass" required name="userPassword"
                            type="password" placeholder="Password"
                            value={pageData.userPassword}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <button
                        type="button"
                        onClick={(e) =>{
                            e.preventDefault()
                            handleSubmit()
                            props.loginData(pageData)
                        }}
                        >Login
                    
                    </button>
                </form>

            </section>

            </div>

        </div>
    )
}


export default LoginPage