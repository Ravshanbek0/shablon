import React, { useState } from 'react'
import "./Home.css"
import { LuFilter } from "react-icons/lu";
import { MdOutlineTableChart } from "react-icons/md";


function Home() {
  const [data, setData] = useState([
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 200,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 100,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 20,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 250,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 250,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 250,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 250,
    },
    {
      img: "./img/image.png",
      name: "Post dizayn",
      type: "post",
      price: 250,
    }
  ])
  return (
    <div className='container'>
      <div className="home">
        <div className="left-home">
          <p> <span><LuFilter /></span>Saralash</p>
          <div className="filter-type">
            <p><span><MdOutlineTableChart /></span>Shablon turlari</p>
            <div className="home-filter-box">
              <div className="filter">
                Web-site
              </div>
              <div className="filter">
                Post dizayn
              </div>
              <div className="filter">
                Logo
              </div>
              <div className="filter">
                Figma
              </div>
              <div className="filter">
                Bot
              </div>
              <div className="filter">
                Android/Ios app
              </div>
              <div className="filter">
                Youtube banner
              </div>
              <div className="filter">
                Insta/Tg kanal
              </div>
            </div>
          </div>
        </div>
        <div className="right-home">
          <h1>Shablonlar - Barchasi.</h1>
          <div className="filter-right-box">
            {data && data.map((item) => {
              return <div className="filter-box-r">
                <img src={item.img} alt="" />
                <p>{item.name}/#{item.type}</p>
                <p>{item.price}$</p>
              </div>
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home