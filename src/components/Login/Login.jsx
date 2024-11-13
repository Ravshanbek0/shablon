import React, { useState } from 'react'
import "./Login.css"
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function Login() {
  const { pathname } = useLocation()
  const [x, setX] = useState()
  useEffect(() => {
    setX(pathname)
  }, [pathname])

  return (
    <>
      {x == "/login" ? <div className={'login'}>
        <div className="left-login">
          <h1>Qaytib kelganingizdan xursandmiz!</h1>
          <p>Sizni yana ko'rganimizdan mamnunmiz! Yangi va yanada qulay xizmatlar bilan ijodingizga qanot bag'ishlashda davom etamiz. Foydali shablonlar va dizayn yechimlarini topishga tayyormisiz? Keling, yangi imkoniyatlarni birga o'rganamiz!</p>
        </div>
        <div className="right-login">
          <form action="" className="form">
            <h1>Kirish</h1>
            <label htmlFor="">Telefon raqamingizni kiriting:</label>
            <input type="number" placeholder='Telefon raqam...' />
            <label htmlFor="">Parolni kiriting:</label>
            <input type="password" placeholder='Parol...' />
            <button>Kirish</button>
            <Link to={'/signup'}><p>Ro'yxatdan o'tmaganmisiz? <span> Ro'yxatdan o'tish</span></p></Link>
          </form>
        </div>
      </div> : //sign-up//
        <div className="login active">
          <div className="left-login">
            <h1>Xush kelibsiz!</h1>
            <p>Sizning tashrif buyurganingizdan mamnunmiz! Yangi va yanada qulay xizmatlar bilan ijodingizga qanot bag'ishlashda davom etamiz. Foydali shablonlar va dizayn yechimlarini topishga tayyormisiz? Keling, yangi imkoniyatlarni birga o'rganamiz!</p>
          </div>
          <div className="right-login">
            <form action="" className="form">
              <h1>Ro'yxatdan o'tish</h1>
              <label htmlFor="">Telefon raqamingizni kiriting:</label>
              <input type="number" placeholder='Telefon raqam...' />
              <label htmlFor="">Ismingizni kiriting:</label>
              <input type="text" placeholder='Ism...' />
              <label htmlFor="">Parol yarating:</label>
              <input type="text" placeholder='Parol...' />
              <button>Ro'yxatdan o'tish</button>
              <Link to={'/login'}><p>Allaqachon ro'yxatdan o'tganmisiz? <span>Kirish</span></p></Link>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Login