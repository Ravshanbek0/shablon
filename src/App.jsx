import React, { useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

function App() {
  const [mainData, setMainData] = useState([])
  console.log(mainData);
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Header mainData={mainData} setMainData={setMainData} />} />
          <Route path='/' element={<Home mainData={mainData} setMainData={setMainData} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App