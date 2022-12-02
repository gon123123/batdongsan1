import React from 'react'
import '../css/boxCardItem.css'

import anhCard from '../asset/image/about1.jpg';

function BoxCardItem({ idSell, image, title, date, address, price, area, star, province, description, handler }) {
    const starSTR = 1;
    var item = [];
    for (let i = 0; i < star; i++) {
        item.push(starSTR);
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
                <button type="button" className="btn_right" onClick={() => handler({ idSell, image, title, date, address, price, area, star, province, description })}>read more</button>
            </div>
        </div>
    )
}

export default BoxCardItem
