import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons'
import bannerGif from '../asset/video/bannerGif.gif';
import contactGif from '../asset/video/contact.gif';
import '../css/home.css';
import about1 from '../asset/image/about1.jpg';
import about2 from '../asset/image/about2.jpg';
import personnel1 from '../asset/image/personnel1.jpg';

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        connectDatabase();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(35, 'Invalid name length 😒')
                .required('This field cannot be left blank'),
            email: Yup.string()
                .max(35, 'Invalid email length 😒')
                .required('This field cannot be left blank'),
            description: Yup.string()
                .max(35, 'Invalid description length 😒')
                .required('This field cannot be left blank'),
        }),
        onSubmit: (values) => {
            let objRePost = {
                name: values.name,
                email: values.email,
                description: values.description,
            }
            firebase.database().ref('report/').push().set(
                objRePost
                , function (err) {
                    if (err) {
                        alert("error: " + err);
                    } else {
                        toast.success('🎉 Successful response!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                    }
                })
        },
    })
    return (
        <div className="home" id="first">
            <div className="container_home">
                <div className="homeBanner">
                    <img className="banner-gif" src={bannerGif} alt="" />
                    <div className="homeTitle">
                        <h1>Choose a place to live that's right for you</h1>
                        <button type="button" onClick={() => { navigate("/register") }}>Start Now</button>
                    </div>
                </div>
                <section>
                    <h3 className="action-title" id="about">ABOUT US</h3>
                    <div className="aboutInfo">
                        <img className="aboutInfo_image1 aboutInfo_image" src={about1} alt="" />
                        <div className=" aboutInfo_content1 aboutInfo_content">
                            <p className="aboutInfo_content_title">Market now</p>
                            <p className="aboutInfo_content_text">Chỉ một thời gian ngắn, sau giãn cách xã hội thị trường bất động sản bắt đầu sôi động. Càng về cuối năm thị trường càng nóng. Nhiều phân khúc bất động sản từ đất nền, liền kề, biệt thự, chung cư… đều có xu hướng tăng giá chóng mặt.
                            </p>
                            <p className="aboutInfo_content_text">
                                Giá nhà liền kề, biệt thự tại những dự án khu đô thị thuộc các huyện ngoại thành Hà Nội như Hoài Đức, Gia Lâm, Đông Anh, Ba Vì, Quốc Oai… cũng đang được chào bán giá rất cao từ chục tỷ đến vài chục tỷ có dự án giá ngang ngửa với đất khu vực nội thành.
                            </p>
                        </div>
                    </div>
                    <div className="aboutInfo">
                        <div className="aboutInfo_content">
                            <p className="aboutInfo_content_title">Market now</p>
                            <p className="aboutInfo_content_text">Chỉ một thời gian ngắn, sau giãn cách xã hội thị trường bất động sản bắt đầu sôi động. Càng về cuối năm thị trường càng nóng. Nhiều phân khúc bất động sản từ đất nền, liền kề, biệt thự, chung cư… đều có xu hướng tăng giá chóng mặt.
                            </p>
                            <p className="aboutInfo_content_text">
                                Giá nhà liền kề, biệt thự tại những dự án khu đô thị thuộc các huyện ngoại thành Hà Nội như Hoài Đức, Gia Lâm, Đông Anh, Ba Vì, Quốc Oai… cũng đang được chào bán giá rất cao từ chục tỷ đến vài chục tỷ có dự án giá ngang ngửa với đất khu vực nội thành.
                            </p>
                        </div>
                        <img className="aboutInfo_image aboutInfo_image2" src={about2} alt="" />
                    </div>
                </section>
                <section>
                    <h3 className="action-title" id="personnel">PERSONNEL</h3>
                    <p className="action-text">We are always ready to give you what you want.</p>
                    <div className="personnel">
                        <div className="personnelCard">
                            <a href="#1">
                                <div className="personnelCard_linear">
                                    <div className="personnel_search">
                                        <box-icon name='search' color='white'></box-icon>
                                    </div>
                                    <p className="personnel_title">Minh Tuan</p>
                                    <p className="personnel_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, molestias.</p>
                                </div>
                            </a>
                            <img className="personnelCard-image" src={personnel1} alt="" />
                        </div>
                        <div className="personnelCard">
                            <a href="#1">
                                <div className="personnelCard_linear">
                                    <div className="personnel_search">
                                        <box-icon name='search' color='white'></box-icon>
                                    </div>
                                    <p className="personnel_title">Thi Vi</p>
                                    <p className="personnel_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, molestias.</p>
                                </div>
                            </a>
                            <img className="personnelCard-image" src={personnel1} alt="" />
                        </div>
                        <div className="personnelCard">
                            <a href="#1">
                                <div className="personnelCard_linear">
                                    <div className="personnel_search">
                                        <box-icon name='search' color='white'></box-icon>
                                    </div>
                                    <p className="personnel_title">Nguye Hanh</p>
                                    <p className="personnel_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, molestias.</p>
                                </div>
                            </a>
                            <img className="personnelCard-image" src={personnel1} alt="" />
                        </div>
                        <div className="personnelCard">
                            <a href="#1">
                                <div className="personnelCard_linear">
                                    <div className="personnel_search">
                                        <box-icon name='search' color='white'></box-icon>
                                    </div>
                                    <p className="personnel_title">Cong Lam</p>
                                    <p className="personnel_text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, molestias.</p>
                                </div>
                            </a>
                            <img className="personnelCard-image" src={personnel1} alt="" />
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className="action-title" id="contacts">CONTACTS</h3>
                    <div className="contact">
                        <div className="contact_from">
                            <form onSubmit={formik.handleSubmit} id="formContact">
                                <div className="formInput">
                                    <label htmlFor="name" className="formInput_label">Name</label>
                                    <input type="text" id="name" className="formInput_input" placeholder='Enter ...' value={formik.values.name} onChange={formik.handleChange} />
                                    {formik.errors.name && formik.touched.name && <span className="formInput_error">* {formik.errors.name}</span>}
                                </div>
                                <div className="formInput">
                                    <label htmlFor="email" className="formInput_label">Email</label>
                                    <input type="email" id="email" className="formInput_input" placeholder='Enter ...' value={formik.values.email} onChange={formik.handleChange} />
                                    {formik.errors.email && formik.touched.email && <span className="formInput_error">* {formik.errors.email}</span>}
                                </div>
                                <div className="formInput">
                                    <label htmlFor="description" className="formInput_label">Description</label>
                                    <textarea className="formInput_input" name="" id="description" cols="30" rows="5" value={formik.values.description} onChange={formik.handleChange}></textarea>
                                    {formik.errors.description && formik.touched.description && <span className="formInput_error">* {formik.errors.description}</span>}
                                </div>
                                <input type="submit" className="contact_btn" value="Send" />
                            </form>
                        </div>
                        <img className="contact_Gif" src={contactGif} alt="" />
                    </div>
                </section>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Home