import React, { useEffect, useState } from 'react'
import "./Card.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CiLink } from "react-icons/ci";
import { Link } from "react-router-dom"


function Card() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const [loader, setLoader] = useState(false)

    function filter(e) {
        console.log(e);

        setData(data)
        const newData = data2.filter((item) => {
            return e == item.type
        })
        console.log(newData);
        setData(newData)
    }
    const disableRightClick = (e) => {
        e.preventDefault();
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage("");
    };

    const { id } = useParams()
    const [cardData, setCardData] = useState([])
    async function fetchAndLinkData() {
        const templateUrl = `https://shablon-uz-mu.vercel.app/api/templates/${id}`;
        const imageUrl = 'https://shablon-uz-mu.vercel.app/api/images/';

        try {
            // Template va Image ma'lumotlarini yuklash
            const [templateResponse, imageResponse] = await Promise.all([
                axios.get(templateUrl),
                axios.get(imageUrl),
            ]);

            const template = templateResponse.data; // Template obyekt
            const images = imageResponse.data; // Rasm ma'lumotlari (array)

            // Template va rasmni bog'lash
            const image = images.find(img => img.id === template.image); // Tegishli rasmni topish
            const linkedData = {
                ...template,
                imageUrl: image ? image.url : null, // Agar rasm topilmasa null
            };

            console.log('Bog\'langan ma\'lumot:', linkedData);
            setCardData([linkedData]); // Ma'lumotni array ichida saqlash
            console.log(linkedData);
            
            // setLoader(false);
            fetchAndLinkDataHome(linkedData.type)

        } catch (error) {
            console.error('Xatolik yuz berdi:', error.message);
            // setLoader(false);
        }

    }
    const templateUrl = 'https://shablon-uz-mu.vercel.app/api/templates/';
    const imageUrl = 'https://shablon-uz-mu.vercel.app/api/images/';

    async function fetchAndLinkDataHome(type) {
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
            setLoader(false)
        } catch (error) {
            setLoader(false)

            console.error('Xatolik yuz berdi:', error.message);
        }
    }
    useEffect(() => {
        fetchAndLinkData()
    }, [id])
    return (
        <div>
            <div className="product-card">

                <div className="card-container" style={{
                    position: "relative"
                }}>
                    <div className="image-section">

                        <img
                            onContextMenu={disableRightClick}
                            onClick={(() => {
                                handleImageClick(cardData[0]?.imageUrl)
                            })}
                            className="main-image"
                            src={cardData[0]?.imageUrl}
                            alt="Honor X9b 5G"
                        />
                    </div>
                    <div className="details-section">
                        <h1>{cardData[0]?.name}
                            <span className="discount-tag">{cardData[0]?.type}</span>
                        </h1>


                        <div className="price-section">
                            <span className="new-price">{cardData[0]?.price * 12800}so'm/{cardData[0]?.price}$</span>
                        </div>
                        <div className="ratings">
                            ⭐⭐⭐⭐⭐ <span>(5 ovoz)</span>
                        </div>

                        <div className="product-info">
                            <p style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "5px"
                            }}><strong>Ko'rish:</strong> {cardData[0]?.link != null && (<a href={cardData[0]?.link} target='_blank'><p style={{

                            }} className="template-description-link"><span><CiLink /></span>Link</p></a>)}</p>
                            <p><strong>To'lov:</strong> <span className="availability">Karta</span></p>


                        </div>
                        <div className="buttons">
                            <button className="add-to-cart">Savatga qo'shish</button>
                            <button className="buy-now">Sotib olish</button>
                        </div>

                    </div>

                </div>
                <div style={{
                    overflow : "auto",
                    width : "30%",
                    maxHeight : "85vh"
                }}>
                    <div className="right-home" style={{
                        flexWrap: "wrap",
                        maxWidth: "220px",
                        marginRight: 0
                    }}>
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
                {isModalOpen && (
                    <div className="modal-home" onClick={closeModal}>
                        <div className="modal-content-home" onClick={(e) => e.stopPropagation()}>
                            <span className="close-home" onClick={closeModal}>
                                &times;
                            </span>
                            <img src={selectedImage} alt="Modal Content" className="modal-image-home" onContextMenu={disableRightClick} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Card