import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MiniCard from './components/miniCard.jsx'
import UserHome from './pages/userHome.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <UserHome />
    </BrowserRouter>
)
