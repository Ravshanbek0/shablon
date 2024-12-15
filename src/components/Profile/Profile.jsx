import React, { useEffect, useState } from 'react'
import './Profile.css'
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Profile({ accessToken, setNavbarData }) {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    function getUser(params) {
        if (accessToken != "") {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            fetch("https://shablon-uz-mu.vercel.app/api/users/me/", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setUserData(result)
                    setNavbarData(result)
                    console.log(result)
                })
                .catch((error) => console.error(error));
        }
        else {
            alert("None")
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='container'>
            <div className="profile">
                <div className="user-profile">
                    <div className="profile-header">
                        <img src="./img/image.png" alt="Profile" className="profile-picture" />
                        <h1 className="user-name">{userData.first_name}</h1>
                        <span onClick={(()=>{
                            localStorage.clear()
                            setNavbarData([])
                            navigate("/")
                        })} className='btn-logout'><IoLogOutOutline /></span>

                    </div>
                    <div className="profile-details">
                        <div className="detail-item">
                            <h2>Phone:</h2>
                            <p>{userData.phone_number}</p>
                        </div>
                        <div className="detail-item">
                            <h2>ID:</h2>
                            <p>{userData.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile