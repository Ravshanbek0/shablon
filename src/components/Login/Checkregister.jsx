import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkregister({ userPhone, userOtpSecret,setAccessToken }) {
    const [smsCode, setSmsCode] = useState("")
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    function patchCode(e) {
        e.preventDefault()
        setLoader(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "phone_number": userPhone,
            "otp_code": smsCode,
        });
        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`https://shablon-uz-mu.vercel.app/api/users/register/verify/${userOtpSecret}/`, requestOptions)
            .then((response) => response.json()).then((result) => {
                console.log(result)
                setAccessToken(result.access)
                localStorage.setItem("token",result.access)
                setLoader(false)
                navigate('/profile')
            }).catch((error) => {
                setLoader(false)
                console.error(error)
            });

    }
    return (
        <div>
            <div className="container">
                <div className="check">
                    <form action="" className="form">
                        <h1>+{userPhone}</h1>
                        <label htmlFor="">6 talik kodni kiriting:</label>
                        <input onChange={((e) => {
                            setSmsCode(e.target.value)
                        })} type="number" placeholder='code' />
                        <button onClick={patchCode}>{loader ? <span className='sign-loader'></span> : "Jo'natish"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkregister