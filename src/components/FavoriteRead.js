import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

import 'boxicons';

import '../css/description.css'
import anh from '../asset/image/anh.jpg';

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FavoriteRead({ name, avatar, idSell, image, title, date, address, price, area, star, province, description, idUser }) {
    const [inFoSeller, setInForSeller] = useState(null);
    const [inFoUser, setInFoUser] = useState(null);
    useEffect(() => {
        // lấy thông tin người Bán
        const getInfoSell = async () => {
            await firebase.database().ref('users/' + idSell).on('value', (snapshot) => {
                setInForSeller(snapshot.val());
            })
        }
        // lấy thông tin người mua
        const getInfoUser = async () => {
            await firebase.database().ref('users/' + idUser).on('value', (snapshot) => {
                setInFoUser(snapshot.val());
            })
        }
        connectDatabase();
        getInfoSell();
        getInfoUser();
    }, []);
    var settings = {
        customPaging: function (i) {
            return (
                <img src={image[i].url} />
            );
        },
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        swipeToSlide: true,
        dotsClass: "slick-dots slick-thumb",
    };
    const handlerAddUser = () => {
        //  tạo id cho cuộc trò chuyện
        let keyMess = firebase.database().ref().child('users').push().key;
        toast.success('🎉 add news friend!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        let updates = {};
        // add cho mySelf
        updates['users/' + idUser + '/listFriend/' + idSell] = {
            idFriend: idSell,
            idMess: keyMess,
            statusRead: false,
            name: inFoSeller.name
        }
        // add cho you
        updates['users/' + idSell + '/listFriend/' + idUser] = {
            idFriend: idUser,
            idMess: keyMess,
            statusRead: false,
            name: inFoUser.name
        }
        firebase.database().ref().update(updates);
    }
    return (
        <div className="boxDescription">
            <div className="slickCarousel">
                <Slider {...settings}>
                    {
                        image.map((item, index) => <img key={index} src={item.url} id="up" alt={item.type} />)
                    }
                </Slider>
            </div>
            <div className="inFoSell">
                <img src={avatar} alt="" />
                <p>{name}</p>
            </div>
            <p className="text textTitle">{title}</p>
            <p className="text date">Date : {date}</p>
            <p className="text date">Address : {address}</p>
            <div className="infoImportant">
                <div className="boxPrice">
                    <p className="text infoImportant_title">Price</p>
                    <p className="text infoImportant_text">{price} $</p>
                </div>
                <div className="boxArea">
                    <p className="text infoImportant_title">Area</p>
                    <p className="text infoImportant_text">{area} m<sup>2</sup></p>
                </div>
                <div className="boxProvince">
                    <p className="text infoImportant_title">Province</p>
                    <p className="text infoImportant_text">{province}</p>
                </div>
            </div>
            <p className="text textDescriptionTitle">Description</p>
            <pre className="textDescription">{description}</pre>
            <div className="btn_description">
                <p className="btn_description-text"></p>
                {idUser === idSell
                    ? <button type="button" className="chat">
                        <box-icon name='message-square-dots' type='solid' color="#1eb2a6" ></box-icon>
                        <p className="btn_description-text">add friend</p>
                    </button>
                    : <button type="button" className="chat" onClick={() =>
                        handlerAddUser()
                    }>
                        <box-icon name='message-square-dots' type='solid' color="#1eb2a6" ></box-icon>
                        <p className="btn_description-text">add friend</p>
                    </button>
                }
            </div>
        </div>
    )
}

export default FavoriteRead