import React from 'react'
import "./App.css"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Login from './components/Login/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Header />}/> 
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App