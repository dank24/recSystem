import react from "react";
import {useState, useEffect} from 'react'

const LoginPage = () =>{

    const [pageData, setPageData] = useState({
        userName: '',
        userPassword: '',
    })

    console.log(pageData)
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
    
    return(
        <div id="loginMainCont">

            <div id="loginFirstDiv">

                <form id="lForm">
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
                            id="userPass" required
                            type="password" placeholder="Password"
                            value={pageData.userPassword}
                            onChange={handleChange}
                        />
                    </fieldset>

                    <button
                    
                        >Login
                    
                    </button>
                </form>

            </div>

        </div>
    )
}


export default LoginPage