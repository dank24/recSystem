import react from "react";
import {useState, useEffect} from 'react'

const LoginPage = () =>{

    const [pageData, setPageData] = useState({
        userName: '',
        userPassword: '',
    })

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
const handleSubmit = (e) =>{
    e.preventDefault()
    fetch('http://localhost:3021/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pageData)
    }).then(res => res.json()).then(data => console.log(data))
} 

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
                        onClick={handleSubmit}
                        >Login
                    
                    </button>
                </form>

            </section>

            </div>

        </div>
    )
}


export default LoginPage