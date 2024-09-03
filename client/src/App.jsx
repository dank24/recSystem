import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import SignUp from './pages/signUpPage'
import HomePage from './pages/homepage'
import Login from './pages/loginPage'
import MiniCard from './components/miniCard'
import OnBoarding from './pages/onBoarding'
import UserHome from './pages/userHome'

function App() {
  const [count, setCount] = useState(0)

  let [signupPage, setSignupPage] = useState()
  let [loginPage, setLoginPage] = useState()
  let [onboardingPage, setOnboardingPage] = useState()
  let [userHomePage, setUserHomePage] = useState()


  function loginPageFunc(rec){
    setLoginPage(rec)
  }
  function onBoardPageFunc(rec){
    setOnboardingPage(rec)
  }

  useEffect(()=>{
  }, [onboardingPage])

  return (
    <div id='appMainCont'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< HomePage/>} />
          <Route path='/signup' element={< SignUp />} />
          <Route path='/login' element={< Login loginData={loginPageFunc} />} />
          <Route path='/onboarding/:id?' element={< OnBoarding onBoardData={onBoardPageFunc}/>} />
          <Route path='/userhome' element={< UserHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}



export default App
