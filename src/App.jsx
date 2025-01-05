import React, { useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Checkregister from './components/Login/Checkregister'
import Profile from './components/Profile/Profile'
import Card from './components/Card/Card'

function App({ }) {
  const [mainData, setMainData] = useState([])
  const [navbarData, setNavbarData] = useState(true)
  const [userPhone, setUserPhone] = useState("")
  const [userOtpSecret, setUserOtpSecret] = useState("")

  const [accessToken, setAccessToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
  console.log(accessToken);
  useEffect(() => {
    setNavbarData()
    if (navbarData==false) {
      window.location.reload();
      setNavbarData(true)
    }
  }, [navbarData])
  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar accessToken={accessToken} navbarData={navbarData} />
        <Routes>
          <Route path='/' element={<Header mainData={mainData} setMainData={setMainData} />} />
          <Route path='/card/:id' element={<Card />} />
          <Route path='/' element={<Home mainData={mainData} setMainData={setMainData} />} />
          <Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
          <Route path='/profile' element={<Profile setNavbarData={setNavbarData} accessToken={accessToken} />} />
          <Route path='/signup' element={<Login setUserOtpSecret={setUserOtpSecret} setUserPhone={setUserPhone} />} />
          <Route path='/check' element={<Checkregister userPhone={userPhone} userOtpSecret={userOtpSecret} setAccessToken={setAccessToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App