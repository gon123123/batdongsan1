import React from 'react'
import Slider from 'react-slick';

import 'boxicons';

import '../css/descriptionUpdate.css'
import anh from '../asset/image/anh.jpg';

function DescriptionUpdate(props) {
    var settings = {
        customPaging: function () {
            return (
                <img src={anh} />
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
    const { image, title, date, map, price, area, province, star, description } = props.data;
    return (
        <div className="boxDescription">
            <input multiple type="file" name="file"/>
            {/* <div className="slickCarousel">
                <Slider {...settings}>
                    <img src={anh} alt="" />
                    <img src={anh} alt="" />
                    <img src={anh} alt="" />
                </Slider>
            </div> */}
            <p className="text textTitle">{title}</p>
            <p className="text date">Date : {date}</p>
            <p className="text date">Address : {map}</p>
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

            <p className="textDescription">{description}</p>
            <div className="btn_description">
                <p className="btn_description-text">Save post</p>
                <button type="button" className="chat">
                    <box-icon name='message-square-dots' type='solid' ></box-icon>
                    <p className="btn_description-text">Chat</p>
                </button>
            </div>
        </div>
    )
}

export default DescriptionUpdate