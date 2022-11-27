import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

import BoxCardItem from '../../components/BoxCardItem'
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import FavoriteRead from '../../components/FavoriteRead';

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
function Favorite() {
    const keyUser = localStorage.getItem('keyUser')
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const [readPost, setReadPost] = useState({
        read: false,
        data: null,
    })
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyCi03lnEWgFK61CV32HJaPsYC8uohWG2AA",
            authDomain: "batdongsanweb.firebaseapp.com",
            projectId: "batdongsanweb",
            storageBucket: "batdongsanweb.appspot.com",
            messagingSenderId: "853795324769",
            appId: "1:853795324769:web:6128febc029646f2763b20",
            measurementId: "G-4DH9E26NJV"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log("ket noi thanh cong myPort");
        }
        getListFavorite();
    }, []);
    const [listFavorite, setListFavorite] = useState(null);
    const getListFavorite = () => {
        firebase.database().ref('favorite/' + keyUser).on('value', (snapshot) => {
            let arrCPList = []
            snapshot.forEach(function (itemFavorite) {
                arrCPList = itemFavorite.val();
            })
            setListFavorite(arrCPList);
            console.log("danh sach post");
            console.log(arrCPList);
        })
    }
    const HandlerRead = (data) => {
        setReadPost({
            read: true,
            data: data,
        })
    }
    const HandlerVisible = () => {
        if (readPost.read) {
            return <FavoriteRead data={readPost.data}></FavoriteRead>
        } else {
            return <div className="boxPost">
                <div className="filterData">
                    {/* <select className="filterData_select" name="price" id="price">
<option value="increase">increase</option>
<option value="reduce">reduce</option>
</select> */}
                    <BoxSelect></BoxSelect>
                    <BoxSearch></BoxSearch>
                </div>
                <p className="boxTitle">Favorite</p>
                <div className="boxCard">
                    {
                        listFavorite === null || listFavorite.length === 0
                            ? <p>khong co bai viet yeu thich nao ca</p>
                            : listFavorite.map((item, index) => {
                                return <BoxCardItem key={index} data={item} handler={HandlerRead}></BoxCardItem>
                            })
                    }
                </div>
                <Pagination></Pagination>
                <div className="slider"></div>
            </div>
        }
    }
    return (
        <div className="colSection">
            <HandlerVisible></HandlerVisible>
        </div>
    )
}

export default Favorite