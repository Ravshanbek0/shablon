import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

function Navbar() {
    return (
        <div>
            <nav>
                <div className="container">
                    <div className="nav">
                        <div className="left-nav">
                            <Link to={'/'}><h1>NAME</h1></Link>
                            {/* <p>Open source</p>
                            <p>Biz haqimizda</p> */}
                        </div>
                        <div className="right-nav">
                            <div className="btn-nav"><Link to={"/login"}><button className='login-btn'>Kirish</button></Link></div>
                            <Link to={"/signup"}><button className='sign-btn'>Ro'yxatdan o'tish</button></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar