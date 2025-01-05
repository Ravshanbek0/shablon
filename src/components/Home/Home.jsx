import React, { useEffect, useState } from 'react'
import "./Home.css"
import { LuFilter } from "react-icons/lu";
import { MdOutlineTableChart } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home(mainData, setMainData) {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [dataImages, setDataIMages] = useState([])
  const [categry, setCategory] = useState("all")
  const [loader, setLoader] = useState(false)
  const [imageKey, setIMageKey] = useState("")
  let imgurl;
  function filter(e) {
    setData(data)
    const newData = data2.filter((item) => {
      return e == item.type
    })
    console.log(newData);
    setData(newData)
  }
  const templateUrl = 'https://shablon-uz-mu.vercel.app/api/templates/';
  const imageUrl = 'https://shablon-uz-mu.vercel.app/api/images/';

  async function fetchAndLinkData() {
    setLoader(true)
    try {
      // Template va Image ma'lumotlarini yuklash
      const [templateResponse, imageResponse] = await Promise.all([
        axios.get(templateUrl),
        axios.get(imageUrl),
      ]);

      const templates = templateResponse.data; // Template ma'lumotlari
      const images = imageResponse.data; // Rasm ma'lumotlari

      // Template va rasmlarni bog'lash
      const linkedData = templates.map(template => {
        const image = images.find(img => img.id === template.image); // Rasmni topish
        return {
          ...template,
          imageUrl: image ? image.url : null, // Agar topilmasa null
        };
      });

      console.log('Bog\'langan ma\'lumotlar:', linkedData);
      setData(linkedData)
      setData2(linkedData)
      setLoader(false)
    } catch (error) {
      setLoader(false)

      console.error('Xatolik yuz berdi:', error.message);
    }
  }

  useEffect(() => {
    fetchAndLinkData()
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
          {loader ? <div className="loader-modal">
            <span className='loader'></span>
          </div> : <div className="filter-right-box">


            {data.map((item, index) => {
              return (<Link to={`/card/${item.id}`}>
                <div key={index} className="filter-box-r">
                  <img src={item.imageUrl} alt="Shablon" />
                  <p>{item.name}</p>
                  <span>{item.type}</span>
                  <p>{item.price}$</p>

                </div></Link>)
            })
            }
          </div>}


        </div>
      </div>
    </div>
  )
}

export default Home