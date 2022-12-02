import React, { useEffect } from 'react'
import '../css/boxCardItem.css'

import anhCard from '../asset/image/about1.jpg';

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BoxCardFavorite({ keyItemFavorite, name, avatar, idSell, image, title, date, address, price, area, star, province, description, idUser, handler }) {
    useEffect(() => {
        connectDatabase();
    }, []);
    const starSTR = 1;
    var item = [];
    for (let i = 0; i < star; i++) {
        item.push(starSTR);
    }
    const handleDelPostFavorite = () => {
        toast.warning('😭 Post deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        firebase.database().ref('myFavorite/' + idUser + '/post/' + keyItemFavorite).remove();
    }
    return (
        <div className="card">
            <div className="card_top">
                <img src={image[0].url} alt="" />
            </div>
            <div className="card_bottom">
                <div className="card_bottom_priceStar">
                    <span>
                        <box-icon name='money-withdraw' color="gray" size="xs"></box-icon>
                        <p>{price} $</p>
                    </span>
                    <div className="star">
                        {item.map((item, index) => {
                            return <box-icon key={index} name="star" type="solid" color="#FFA34D" size="xs"></box-icon>
                        })}
                    </div>
                </div>
                <div className="card_bottom_priceStar">
                    <span>
                        <box-icon name='map' color="gray" size="xs"></box-icon>
                        <p className="text">{address}</p>
                    </span>
                </div>
                <div className="card_bottom_priceStar">
                    <span>
                        <box-icon name='area' color="gray" size="xs"></box-icon>
                        <p className="text">{area} m<sup>2</sup> </p>
                    </span>
                </div>
                <button type="button" className="btn_left" onClick={() => handleDelPostFavorite()}>delete</button>
                <button type="button" className="btn_right" onClick={() => handler({ content: 1, key: keyItemFavorite, data: { name, avatar, idSell, image, title, date, address, price, area, star, province, description } })}>read post</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BoxCardFavorite
