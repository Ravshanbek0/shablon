import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import { FaCircleUser } from "react-icons/fa6";
import { use } from 'react';

function Navbar({ navbarData, accessToken }) {
    const [navbar, setNavbar] = useState(false)
    useEffect(() => {
        if (accessToken != "") {
            setNavbar(true)
        }
    }, [accessToken])
    return (
        <div>
            <nav>
                <div className="container">
                    <div className="nav">
                        <div className="left-nav">
                            <Link to={'/'}><h1>
                                <img src="./img/last draft.png" alt="" />
                                SHABLON
                            </h1>
                            </Link>
                            {/* <p>Open source</p>
                            <p>Biz haqimizda</p> */}
                        </div>
                        {navbar ? <Link to={'/profile'}><div className='nav-profile'><span><FaCircleUser /></span> <p>Profile</p> </div></Link> : <div className="right-nav">
                            <div className="btn-nav"><Link to={"/login"}><button className='login-btn'>Kirish</button></Link></div>
                            <Link to={"/signup"}><button className='sign-btn'>Ro'yxatdan o'tish</button></Link>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar