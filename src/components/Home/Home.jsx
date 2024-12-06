import React, { useEffect, useState } from 'react'
import "./Home.css"
import { LuFilter } from "react-icons/lu";
import { MdOutlineTableChart } from "react-icons/md";


function Home(mainData, setMainData) {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [categry, setCategory] = useState("all")
  function filter(e) {
    setData(data)
    const newData = data2.filter((item)=>{
      return e==item.type
    })
    console.log(newData);
    setData(newData)
  }
  function homeData(params) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://shablon-uz-mu.vercel.app/api/templates/list/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setData2(result)
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    homeData()
  }, [])
  return (
    <div className='container'>
      <div className="home">
        <div className="left-home">
          <p> <span><LuFilter /></span>Saralash</p>
          <div className="filter-type">
            <p><span><MdOutlineTableChart /></span>Shablon turlari</p>
            <div className="home-filter-box">
              <button value={"WebSite"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Web-site
              </button>
              <button value={"Post dizayn"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Post dizayn
              </button>
              <button value={"Logo"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Logo
              </button>
              <button value={"Figma"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Figma
              </button>
              <button value={"Bot"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Bot
              </button>
              <button value={"app"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Android/Ios app
              </button>
              <button value={"Youtube banner"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Youtube banner
              </button>
              <button value={"channel"} onClick={(e) => {
                filter(e.target.value)
              }} className="filter">
                Insta/Tg kanal
              </button>
            </div>
          </div>
        </div>
        <div className="right-home">
          <h1>Shablonlar - Barchasi.</h1>
          <div className="filter-right-box">
            {data.length>0 ? data.map((item, index) => {
              return <div key={index} className="filter-box-r">
                <img src={item.preview} alt="Shablon" />
                <p>{item.name}</p>
                <p>{item.price}$</p>
              </div>
            }) : data.length==0 && <h1>Hech qanday ma'lumot yo'q</h1>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home