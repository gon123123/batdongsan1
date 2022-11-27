import React from 'react';
import 'boxicons'
import bannerGif from '../asset/video/bannerGif.gif';
import contactGif from '../asset/video/contact.gif';
import '../css/home.css';
import about1 from '../asset/image/about1.jpg'
import about2 from '../asset/image/about2.jpg'
import personnel1 from '../asset/image/personnel1.jpg'

function Home() {
    return (
        <div className="home">
            <div className="container_home">
                <div className="homeBanner">
                    <img className="banner-gif" src={bannerGif} alt="" />
                    <div className="homeTitle">
                        <h1>Choose a place to live that's right for you</h1>
                        <button type="button" onClick={() => { }}>Start Now</button>
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
                            <div className="formInput">
                                <label htmlFor="name" className="formInput_label">Name</label>
                                <input type="text" className="formInput_input" placeholder='Enter ...' />
                                <span className="formInput_error">* khong dung</span>
                            </div>
                            <div className="formInput">
                                <label htmlFor="email" className="formInput_label">Email</label>
                                <input type="email" className="formInput_input" placeholder='Enter ...' />
                                <span className="formInput_error">* khong dung</span>
                            </div>
                            <div className="formInput">
                                <label htmlFor="dess" className="formInput_label">Description</label>
                                <textarea  className="formInput_input" name="" id="dess" cols="30" rows="5"></textarea>
                                <span className="formInput_error">* khong dung</span>
                            </div>
                                <button className="contact_btn"type="button" onClick={() => { }}>Send</button>
                        </div>
                        <img className="contact_Gif" src={contactGif} alt="" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home