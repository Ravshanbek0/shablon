import React, { useState } from 'react'
import "./Login.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Login({ setUserPhone, setUserOtpSecret, setAccessToken }) {
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const [x, setX] = useState()
  const [userPhoneNumber, setUserPhoneNumber] = useState("")
  const [userPassword, setuserPassword] = useState("")
  const [errorAlert, setErrorAlert] = useState(false)
  const [errorAlertLogin, setErrorAlertLogin] = useState(false)

  const [userRegisterPhone, setUserRegisterPhone] = useState("")
  const [userRegisterName, setUserRegisterName] = useState("")
  const [userRegisterCode, setUserRegisterCode] = useState("")

  const [loader, setLoader] = useState(false)


  useEffect(() => {
    setX(pathname)
  }, [pathname])

  function loginToken(e) {
    setLoader(true)
    e.preventDefault()
    if (userPhoneNumber == "") {
      setErrorAlertLogin(true)
    }
    if (userPassword == "") {
      setErrorAlertLogin(true)
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "phone_number": userPhoneNumber,
      "password": userPassword,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // mode: 'no-cors',
      redirect: "follow"
    };

    fetch("https://shablon-uz-mu.vercel.app/api/users/login/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.access) {
          setAccessToken(result.access)
          localStorage.setItem("token", result.access)
          navigate("/")
        }else{
        setErrorAlertLogin(true)

        }
        setLoader(false)
        setUserPhoneNumber("")
        setuserPassword("")
      }).catch((error) => {
        setLoader(false)
        setUserPhoneNumber("")
        setuserPassword("")
        setErrorAlertLogin(true)

        console.error(error)
      });
  }

  function singUpToken(e) {
    setLoader(true)
    e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "first_name": userRegisterName,
      "phone_number": userRegisterPhone,
      "password": userRegisterCode
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://shablon-uz-mu.vercel.app/api/users/register/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setUserOtpSecret(result.otp_secret)
        setLoader(false)

        if (result.otp_secret) {
          navigate("/check")
        }
      })
      .catch((error) => {
        setLoader(false)
        setErrorAlert(true)
      });
  }

  return (
    <>
      {errorAlert && (<Stack sx={{ width: '100%' }} style={{ position: "fixed", top: "0" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Bunday nomer bn ro'yxatdan o'tilgan
        </Alert>
      </Stack>)}
      {errorAlertLogin && (
        <Stack sx={{ width: '100%' }} style={{ position: "fixed", top: "0" }} spacing={2}>

          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Parol yoki nomerda xatolik!
          </Alert>
        </Stack>
      )}
      {x == "/login" ? <div className={'login'}>
        <div className="left-login responsive-none">
          <h1>Qaytib kelganingizdan xursandmiz!</h1>
          <p>Sizni yana ko'rganimizdan mamnunmiz! Yangi va yanada qulay xizmatlar bilan ijodingizga qanot bag'ishlashda davom etamiz. Foydali shablonlar va dizayn yechimlarini topishga tayyormisiz? Keling, yangi imkoniyatlarni birga o'rganamiz!</p>
        </div>
        <div className="right-login">
          <form action="" className="form">
            <h1>Kirish</h1>
            <label >Telefon raqamingizni kiriting:</label>
            <input value={userPhoneNumber} onChange={((e) => {
              setUserPhoneNumber(e.target.value);
            })} type="number" placeholder='Telefon raqam...' />
            <label htmlFor="">Parolni kiriting:</label>
            <input value={userPassword} onChange={((e) => {
              setuserPassword(e.target.value)
            })} type="password" placeholder='Parol...' />
            <button onClick={loginToken}>
              {loader ? <span className='sign-loader'></span> : "Kirish"}
            </button>
            <Link to={'/signup'}><p>Ro'yxatdan o'tmaganmisiz? <span> Ro'yxatdan o'tish</span></p></Link>
          </form>
        </div>
      </div> : //sign-up//
        <div className="login active">
          <div className="left-login responsive-none">
            <h1>Xush kelibsiz!</h1>
            <p>Sizning tashrif buyurganingizdan mamnunmiz! Yangi va yanada qulay xizmatlar bilan ijodingizga qanot bag'ishlashda davom etamiz. Foydali shablonlar va dizayn yechimlarini topishga tayyormisiz? Keling, yangi imkoniyatlarni birga o'rganamiz!</p>
          </div>
          <div className="right-login">
            <form onSubmit={singUpToken} action="" className="form">
              <h1>Ro'yxatdan o'tish</h1>
              <label htmlFor="">Telefon raqamingizni kiriting:</label>
              <input value={userRegisterPhone} onChange={((e) => {
                setUserRegisterPhone(e.target.value)
                setUserPhone(e.target.value)
              })} type="number" placeholder='Telefon raqam...' />
              <label htmlFor="">Ismingizni kiriting:</label>
              <input value={userRegisterName} onChange={((e) => {
                setUserRegisterName(e.target.value)
              })} type="text" placeholder='Ism...' />
              <label htmlFor="">Parol yarating:</label>
              <input value={userRegisterCode} onChange={((e) => {
                setUserRegisterCode(e.target.value)
              })} type="password" placeholder='Parol...' />
              <button onClick={singUpToken}>{loader ? <span className='sign-loader'></span> : "Ro'yxatdan o'tish"}</button>
              <Link to={'/login'}><p>Allaqachon ro'yxatdan o'tganmisiz? <span>Kirish</span></p></Link>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Login