import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import Home from '../Home/Home'

function Header() {
  return (
    <>
      <div className='header'>
        <div className="container">
          <header>
            <div className="text">
              <h1>Shablonlar dunyosi - Har turdagi dizayn shablonlari bilan ijodingizga qulaylik!</h1>
              <p>Har turdagi dizaynlar uchun zamonaviy va oson moslashtiriladigan shablonlar. Tezkor yuklab olish va loyihalaringizni tezda ishga tushirish imkoniyati!</p>
            </div>
            <img src="./img/header.png" alt="" />
          </header>
        </div>
      </div>
      <Home />
    </>
  )
}

export default Header