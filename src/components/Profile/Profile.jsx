import React, { useEffect, useState } from 'react'
import './Profile.css'
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiRedo } from "react-icons/ci";
import { CiLink } from "react-icons/ci";

function Profile({ accessToken, setNavbarData }) {
    const [userData, setUserData] = useState([])
    const [userDataTemplate, setUserDataTemplate] = useState([])
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenInput, setIsModalOpenInput] = useState(false);
    const [loader, setLoader] = useState(false)
    const [loaderUser, setLoaderUser] = useState(false)

    const [loaderImageUpload, setLoaderImageUpload] = useState(false)
    const [loaderImageUploadImg, setLoaderImageUploadImg] = useState(false)

    const [imageFile, setImageFile] = useState("")
    const [imageFileInput, setImageFileInput] = useState("")
    const [imageId, setImageId] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [type, setType] = useState("WebSite")
    const [islink, setIsLink] = useState(false)
    const [link, setLink] = useState(null)
    const [service, setService] = useState(false)

    function getUser(params) {
        setLoaderUser(true)
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
                    setLoaderUser(false)

                })

                .catch((error) => {
                    console.error(error)
                    setLoaderUser(false)

                });
        }
        else {
            alert("None")
            setLoaderUser(false)

        }
    }

    const fetchTemplatesWithImages = async () => {
        setLoader(true)
        try {
            const token = accessToken; // Tokeningizni shu yerga yozing
            const templatesUrl = "https://shablon-uz-mu.vercel.app/api/templates/my/";
            const imagesUrl = "https://shablon-uz-mu.vercel.app/api/images/";

            // 1. Templates API chaqiruvi (access token bilan)
            const templatesResponse = await axios.get(templatesUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const templates = templatesResponse.data;

            // 2. Images API chaqiruvlari
            const templatesWithImages = await Promise.all(
                templates.map(async (template) => {
                    // Faqat kerakli `imageId` uchun so'rov yuboramiz
                    const imageResponse = await axios.get(`${imagesUrl}${template.image}`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const imageData = imageResponse.data;

                    // Shablonni imageUrl bilan birlashtirish
                    return {
                        ...template,
                        imageUrl: imageData.url, // Faraz qilamizki, API `url`ni qaytaradi
                    };
                })
            );

            setUserDataTemplate(templatesWithImages);
            console.log(templatesWithImages);
            setLoader(false)
        } catch (error) {
            setLoader(false)

            console.error("Xatolik:", error.response ? error.response.data : error.message);
        }
    };

    //Image and template upload

    const handleUpload = async (e) => {
        setLoaderImageUploadImg(true)
        if (imageFile == "") {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await axios.post(
                "https://shablon-uz-mu.vercel.app/api/images/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // alert("File uploaded successfully!");
            console.log("Response:", response.data);
            setImageId(response.data.id)
        } catch (error) {
            setLoaderImageUploadImg(false)
            // setUploadStatus("Failed to upload file.");
            console.error("Error:", error.response || error.message);
        }
        setLoaderImageUploadImg(false)
        setIsModalOpen(false)
        setIsModalOpenInput(true)
    }

    function templateUpload(params) {
        setLoaderImageUpload(true)
        if (imageId != null) {
            const number = parseFloat(price);
            const formData = new FormData();
            console.log(number);
            if (type == "") {
                setType("WebSite")
            }
            formData.append('name', `${name}`);
            formData.append('description', `${description}`);
            formData.append('price', price);
            formData.append('image', imageId);
            formData.append('type', `${type}`);
            formData.append('link', `${link}`);
            formData.append('service', service);

            axios.post('https://shablon-uz-mu.vercel.app/api/templates/create/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            })
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        setLoaderImageUpload(false)
        setIsModalOpenInput(false)
    }

    //Image src input

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageFileInput(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //Image open modal

    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedImage2, setSelectedImage2] = useState("");

    const handleImageClick2 = (imageUrl) => {
        setSelectedImage2(imageUrl);
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
        setSelectedImage2("");
    };

    useEffect(() => {
        getUser()
        fetchTemplatesWithImages()
    }, [])

    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        role: "Frontend Developer",
        avatar: "https://via.placeholder.com/100",
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsModalOpenInput(false);
    };
    return (
        <div className="profile-container">
            {/* Chapdagi User Info */}
            <aside className="user-info">
                {loaderUser ? <div className="loader-modal">
                    <span className='loader'></span></div> : <div className="user-card">
                    {/* <img src={user.avatar} alt="User Avatar" className="user-avatar" /> */}
                    <h2 className="user-name">{userData.first_name}</h2>
                    <p className="user-email">ID: {userData.id}</p>
                    <p className="user-role">{userData.phone_number}</p>
                    <button className="edit-profile-btn"><span onClick={(() => {
                        localStorage.removeItem("token");
                        setNavbarData(false)
                        confirm("Chiqishni xohlaysizmi?")
                        navigate("/")
                    })} className='btn-logout'><IoLogOutOutline />chiqish</span></button>
                </div>}
            </aside>

            {/* Asosiy Template List */}
            <main className="templates-section">
                <h1>Sizning shablonlaringiz:</h1>
                {loader ? <div className="loader-modal">
                    <span className='loader'></span></div> : (<div className="templates-grid">
                        {userDataTemplate.length == 0 ? (<h1 className='none-h1-profile'>Hech qanday shablon yo'q.</h1>) : (
                            userDataTemplate.map((template) => {
                                return (<div key={template.id} className="template-card">
                                    <img onClick={(() => {
                                        handleImageClick2(template.imageUrl)
                                    })} src={template.imageUrl} className="template-img" />

                                    <h3 className="template-title">{template.name}</h3>
                                    <h3 className="template-title">{template.price * 12800} so'm</h3>
                                    <p className="template-description" style={{maxWidth: "100%"}}>{template.description}</p>
                                    {template.link != "null" && (<a href={template.link} target='_blank'><p className="template-description-link"><span><CiLink /></span>Link</p></a>)}
                                    <span className={template?.status === "approved" ? "teplate-status status" : "teplate-status"}>{template?.status === "approved" ? "Qabul qilindi" : "Yuborildi"} </span>

                                </div>)
                            })
                        )}
                    </div>)}

            </main>

            <button className="add-template-btn" onClick={handleOpenModal}>+</button>
            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                        <h2>Upload Image</h2>
                        <form className="modal-form">
                            {imageFileInput == "" ? (<label htmlFor="image-upload" className="">
                                <input
                                    onChange={((e) => {
                                        setImageFile(e.target.files[0])
                                        handleImageUpload(e)
                                    })}
                                    type="file"
                                    id="image-upload"
                                // className="file-upload-input"
                                />
                                {/* <span className="plus-icon">+</span> */}
                            </label>) : (
                                <div>
                                    <img src={imageFileInput} alt="shablon rasmi" className='image-input-show' />
                                    <p className='p-remove-img' onClick={(() => {
                                        setImageFileInput("")
                                    })}><span><CiRedo /></span>Re Image</p>
                                </div>
                            )}

                            <button onClick={(() => {
                                handleUpload()

                            })} type="button" className="upload-btn">{loaderImageUploadImg ? <span className='sign-loader'></span> : "Joylash"}</button>
                        </form>
                    </div>
                </div>
            )}
            {isModalOpenInput && (
                <div className="modal-overlay">
                    <div className="modal-content active-modal">
                        <button className="close-btn" onClick={handleCloseModal}>×</button>
                        <h2>Upload Template</h2>
                        <form className="modal-form">
                            <label htmlFor="" className="modal-input-i">
                                <h1>Shablon nomi:</h1>
                                <input
                                    style={{
                                        padding: 10
                                    }}
                                    onChange={((e) => {
                                        setName(e.target.value)
                                    })}
                                    placeholder='Name...'
                                    type="text"
                                />
                            </label>
                            <label htmlFor="" className="modal-input-i">
                                <h1>Shablon narxi($):</h1>

                                <input
                                    style={{
                                        padding: 10
                                    }}
                                    onChange={((e) => {
                                        setPrice(e.target.value)
                                    })}
                                    type="text"
                                    placeholder='Price....'
                                />
                            </label>
                            <label htmlFor="" className="modal-input-i">
                                <h1>Service xizmati(o'zgartirib berish):</h1>

                                <input
                                    value={true}
                                    style={{
                                        padding: 10
                                    }}
                                    onChange={((e) => {
                                        if (!service) {
                                            setService(true)
                                        }else{
                                            setService(false);
                                        }
                                        
                                    })}
                                    type="checkbox"
                                    placeholder='Price....'
                                />
                            </label>
                            <label htmlFor="" className="modal-input-i">
                                <h1>Shablon turi:</h1>
                                <select onChange={((e) => {
                                    setType(e.target.value)
                                    console.log(e.target.value);
                                    if (e.target.value == "WebSite" || e.target.value == "" || e.target.value == "Figma" || e.target.value == "Bot" ||  e.target.value == "app" || e.target.value == "channel") {
                                        setIsLink(true)
                                    }
                                    if(e.target.value == "Post dizayn"  || e.target.value == "Logo" || e.target.value == "Youtube banner" ){
                                        setIsLink(false)
                                    }
                                })} name="" id="">
                                    <option value="WebSite">Web-site</option>
                                    <option value="Post dizayn">Post dizayn</option>
                                    <option value="Logo">Logo</option>
                                    <option value="Figma">Figma</option>
                                    <option value="Bot">Bot</option>
                                    <option value="app">Android/Ios app</option>
                                    <option value="Youtube banner">Youtube banner</option>
                                    <option value="channel">Insta/Tg kanal</option>
                                </select>
                                {/* <input
                                    style={{
                                        padding: 10
                                    }}
                                    onChange={((e) => {
                                        setPrice(e.target.value)
                                    })}
                                    type="text"
                                    placeholder='Type...'
                                /> */}
                            </label>
                            {islink && (
                                <label htmlFor="" className="modal-input-i">
                                    <h1>Link</h1>

                                    <input
                                        style={{
                                            padding: 10
                                        }}
                                        onChange={((e) => {
                                            setLink(e.target.value)
                                        })}
                                        type="text"
                                        placeholder='Link....'
                                    />
                                </label>
                            )}
                            <label htmlFor="" className="modal-input-i">
                                <h1>Shablon haqida:</h1>

                                <textarea
                                    style={{
                                        padding: 10
                                    }}
                                    onChange={((e) => {
                                        setDescription(e.target.value)
                                    })}
                                    type="text"
                                    placeholder='Description...'
                                />
                            </label>
                            <button onClick={(() => {
                                templateUpload()

                                console.log(name, price, description, type);

                            })} type="button" className="upload-btn">{loaderImageUpload ? <span className='sign-loader'></span> : "Joylash"}</button>
                        </form>
                    </div>
                </div>
            )}
            {isModalOpen2 && (
                <div className="modal-home" onClick={closeModal2}>
                    <div className="modal-content-home" onClick={(e) => e.stopPropagation()}>
                        <span className="close-home" onClick={closeModal2}>
                            &times;
                        </span>
                        <img src={selectedImage2} alt="Modal Content" className="modal-image-home" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile