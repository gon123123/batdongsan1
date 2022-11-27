import React, { useState } from 'react'
import Slider from 'react-slick';

import 'boxicons';

import '../css/descriptionUpdate.css'
import anh from '../asset/image/anh.jpg';

function DescriptionUpdate(props) {
    const { idMyPost, image, title, date, map, price, area, province, star, description } = props.data;
    const [dataItem, setDataItem] = useState({ idMyPost, image, title, date, map, price, area, province, star, description });
    const [fileImage, setFileImage] = useState(image);
    console.log(idMyPost);
    var settings = {
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
    const handlerChoseFile = (event) => {
        setFileImage(null);
        console.log(event.target.files)
        const dataFileImage = [];
        let len = (event.target.files).length;
        for (let i = 0; i < len; i++) {
            dataFileImage.push({ url: URL.createObjectURL(event.target.files[i]), name: event.target.files[i].name })
        }
        setFileImage(dataFileImage);
    }
    const handleDelImage = (id) => {
        setFileImage(fileImage.filter((file, index) => index != id));
    }
    return (
        <div className="boxDescription">
            <div className="input_ChooseFile">
                <label type="button" htmlFor="chooseFile" className="btn_choose">Choose Image</label>
                <input style={{ display: 'none' }} id="chooseFile" multiple type="file" name="file" onChange={handlerChoseFile} accept="image/jpeg, image/png," />
                <button type="button" className="btn_choose" onClick={() => setFileImage(null)}>Clear</button>
            </div>
            <div className="slickCarousel">
                <Slider {...settings}>
                    {
                        fileImage != null &&
                        fileImage.map((item, index) => <img key={index} src={item.url} id="up" alt={item.type} />)
                    }
                </Slider>
            </div>
            <div className="imageSelect">
                {
                    fileImage != null &&
                    fileImage.map((item, index) =>
                        <div className="delImage" key={index}>
                            <span onClick={() => handleDelImage(index)}>+</span>
                            <img src={item.url} alt={item.name} style={{ width: "100px", height: "70px" }} />
                        </div>
                    )
                }
            </div>
            <p className="text textTitle">Title</p>
            <input type="text" className="textInput textInputTitle" onChange={(e) => setDataItem({ ...dataItem, title: e.target.value })} value={dataItem.title} />
            <p className="text date">Date : {dataItem.date}</p>
            <p className="text date">Address : </p>
            <input type="text" className="textInput textInputTitle" onChange={(e) => setDataItem({ ...dataItem, map: e.target.value })} value={dataItem.map} />
            <div className="infoImportant">
                <div className="boxPrice">
                    <p className="text infoImportant_title">Price</p>
                    <input type="number" className="textInput textInputPrice" onChange={(e) => setDataItem({ ...dataItem, price: e.target.value })} value={dataItem.price} />
                    <span className="text infoImportant_text"> $</span>
                </div>
                <div className="boxArea">
                    <p className="text infoImportant_title">Area</p>
                    <input type="text" className="textInput textInputArea" onChange={(e) => setDataItem({ ...dataItem, area: e.target.value })} value={dataItem.area}/>
                    <span className="text infoImportant_text"> m<sup>2</sup></span>
                </div>
                <div className="boxArea">
                    <p className="text infoImportant_title">Star</p>
                    <input type="number" className="textInput textInputStar" max="5" min="1" onChange={(e) => setDataItem({ ...dataItem, star: e.target.value })} value={dataItem.star} />
                </div>
                <div className="boxProvince">
                    <p className="text infoImportant_title">Province</p>
                    {/* lo maf chon lai */}
                    <select className="filterData_select" name="province" id="province" onChange={(e) => setDataItem({ ...dataItem, province: e.target.value })}>
                        <option value="Quang tri">quang tri</option>
                        <option value="Da nang">da nang</option>
                    </select>
                </div>
            </div>
            <p className="text textDescriptionTitle">Description</p>
            {/* <p className="textDescription">{dataItem.description}</p> */}
            <textarea className="textInput textAreaDescription" name="" id="" cols="30" rows="10" value={dataItem.description} onChange={(e) => setDataItem({ ...dataItem, description: e.target.value })}></textarea>
            <div className="btn_description">
                <p className="btn_description-text" ></p>
                <button type="button" className="btn_update" onClick={() => props.handlerUpdate(dataItem)}>Update</button>
            </div>
        </div>
    )
}

export default DescriptionUpdate