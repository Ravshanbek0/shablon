import React, { useEffect, useState } from 'react'
import "./Buy.css"
import { useParams, } from 'react-router-dom'
import axios from 'axios'


function Buy() {
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
            // fetchAndLinkDataHome(linkedData.type)

        } catch (error) {
            console.error('Xatolik yuz berdi:', error);
            // setLoader(false);
        }

    }
    const disableRightClick = (e) => {
        e.preventDefault();
    };
    const handleCopy = (event) => {
        const textToCopy = event.target.innerText; // Faqat bosilgan so'zni oladi
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert(`ID nusxalandi: ${textToCopy}`))
            .catch(err => console.error("ID nusxalandi:", err));
    };
    useEffect(() => {
        fetchAndLinkData()
    }, [])
    return (
        <div className='buy'>
            <div className="container-buy">
                <h2>Sotib olish(Demo)</h2>
                <p className="subtitle">{id} ID ga ega shablon.</p>
                <div className="content">
                    <img src={cardData[0]?.imageUrl} alt="GeeksforGeeks" className="logo" onContextMenu={disableRightClick} />
                    <div className="text">
                        <p>
                            Bu sayt demo holatda ishlayotgani uchun to'lov qismi avtomatik tarzda ishlatish imkoniyati mavjud emasligini eslatib o'tamiz hamda buning uchun uzr so'raymiz!
                        </p>
                        <h1>ID: <span onClick={handleCopy}>{id}</span> shu idni Adminga yuboring!</h1>
                        <a href='https://t.me/nab1jonov06' target='_blank' className="btn">Bog'lanish</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buy