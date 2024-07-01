import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import SignUp from './pages/signUpPage'
import HomePage from './pages/homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='appMainCont'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< HomePage/>} />
          <Route path='/signup' element={< SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
