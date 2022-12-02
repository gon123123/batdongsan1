import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'boxicons';

import '../css/descriptionUpdate.css';

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { useFormik } from 'formik';
import * as Yup from 'yup';


function NewPost({ idUser }) {
    const d = new Date();
    const [fileImage, setFileImage] = useState(null);
    const [chooseFile, setChooseFile] = useState(true);
    useEffect(() => {
        connectDatabase();
    }, []);
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
    const newPost = useFormik({
        initialValues: {
            title: "",
            address: "",
            price: 0,
            area: 0,
            star: 0,
            province: "",
            description: "",
            // image
            // date 
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(10, 'Title is not at least 30 characters long')
                .max(1000, 'Maximum length 1000 characters 😒')
                .required('This field cannot be left blank'),
            address: Yup.string()
                .min(10, 'address is not at least 30 characters long')
                .max(1000, 'Maximum length 1000 characters 😒')
                .required('This field cannot be left blank'),
            price: Yup.number()
                .min(1000, 'amount must be greater than or equal to 1000')
                .required('This field cannot be left blank'),
            area: Yup.number()
                .min(1, 'diện tích > 1 ')
                .required('This field cannot be left blank'),
            star: Yup.number()
                .min(1, 'Rate from 1 to 5 stars')
                .required('This field cannot be left blank'),
            province: Yup.string()
                .required('This field cannot be left blank'),
            description: Yup.string()
                .min(10, 'length must be more than 10 characters')
                .max(1500, 'Maximum length 1000 characters 😒')
                .required('This field cannot be left blank'),
        }),
        onSubmit: (values) => {
            var keyMyPost = firebase.database().ref().child('myPost').push().key;
            firebase.database().ref('myPost/' + idUser + '/post/' + keyMyPost).set(
                { ...values, date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(), image: fileImage, idMyPost: keyMyPost }
            )
            firebase.database().ref('post/' + keyMyPost).set(
                { ...values, date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(), image: fileImage, idSell: idUser }
            )
        }
    })


    const convert2base64 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            handlerChoseFile(reader.result.toString())
        }
        reader.readAsDataURL(file);
    }
    const handlerChoseFile = (data) => {
        if (fileImage === null) {
            setFileImage([{ url: data, type: "local" }]);
        } else {
            let dataImage = fileImage;
            dataImage.push({ url: data, type: "local" })
            setFileImage(dataImage);
            console.log(fileImage.length);
        }
        setChooseFile(!chooseFile);
    }
    const handleDelImage = (id) => {
        setFileImage(fileImage.filter((file, index) => index !== id));
    }
    return (
        <div className="boxDescription" >
            <div className="input_ChooseFile">
                <label type="button" htmlFor="chooseFile" className="btn_choose">Choose Image</label>
                <input style={{ display: 'none' }} id="chooseFile" type="file" name="file" onChange={(e) => convert2base64(e)} accept="image/jpeg, image/png," />
                <button type="button" className="btn_choose" onClick={() => {
                    setFileImage(null)
                }}>Clear</button>
            </div>
            <div className="slickCarousel">
                <Slider {...settings}>
                    {
                        fileImage !== null &&
                        fileImage.map((item, index) => <img key={index} src={item.url} id="up" alt="" />)
                    }
                </Slider>
                {(fileImage === null || fileImage.length === 0) && <span className="formInput_error">* You haven't selected a photo yet</span>}
            </div>
            <div className="imageSelect">
                {
                    (fileImage !== null) &&
                    fileImage.map((item, index) =>
                        <div className="delImage" key={index}>
                            <span onClick={() => handleDelImage(index)}>+</span>
                            <img src={item.url} alt="" style={{ width: "100px", height: "70px" }} />
                        </div>
                    )
                }
            </div>
            <form onSubmit={newPost.handleSubmit}>
                <label className="text textTitle" htmlFor="title">Title</label>
                <input type="text" className="textInput textInputTitle" id="title" value={newPost.values.title} onChange={newPost.handleChange} />
                {newPost.errors.title && newPost.touched.title && <span className="formInput_error">* {newPost.errors.title}</span>}
                <p className="text date">Date : {d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</p>
                <label className="text textTitle" htmlFor="address">Address : </label>
                <input type="text" className="textInput textInputTitle" id="address" value={newPost.values.address} onChange={newPost.handleChange} />
                {newPost.errors.address && newPost.touched.address && <span className="formInput_error">* {newPost.errors.address}</span>}
                <div className="infoImportant">
                    <div className="boxPrice">
                        <label className="text infoImportant_title" id="price">Price  <span className="text infoImportant_text"> $</span></label>
                        <input type="number" className="textInput textInputPrice" id="price" value={newPost.values.price} onChange={newPost.handleChange} />
                        {newPost.errors.price && newPost.touched.price && <span className="formInput_error">* {newPost.errors.price}</span>}
                    </div>
                    <div className="boxArea">
                        <label className="text infoImportant_title" htmlFor="area">Area <span className="text infoImportant_text"> m<sup>2</sup></span></label>
                        <input type="text" className="textInput textInputArea" id="area" value={newPost.values.area} onChange={newPost.handleChange} />
                        {newPost.errors.area && newPost.touched.area && <span className="formInput_error">* {newPost.errors.area}</span>}
                    </div>
                    <div className="boxArea">
                        <label className="text infoImportant_title" htmlFor="star">Star</label>
                        <input type="number" className="textInput textInputStar" id="star" max="5" min="1" value={newPost.values.star} onChange={newPost.handleChange} />
                        {newPost.errors.star && newPost.touched.star && <span className="formInput_error">* {newPost.errors.star}</span>}
                    </div>
                    <div className="boxProvince">
                        <label className="text infoImportant_title" htmlFor="province">Province</label>
                        {/* lo maf chon lai */}
                        <select className="filterData_select" name="province" id="province" value={newPost.values.province} onChange={newPost.handleChange}>
                            <option value="Quang tri">quang tri</option>
                            <option value="Da nang">da nang</option>
                            <option value="quang nam">quang nam</option>
                            <option value="quang ngai">quang ngai</option>
                            <option value="hue">hue</option>
                        </select>
                        {newPost.errors.province && newPost.touched.province && <span className="formInput_error">* {newPost.errors.province}</span>}
                    </div>
                </div>
                <label className="text textTitle" htmlFor="description">Description</label>
                <textarea className="textInput textAreaDescription" name="description" id="description" cols="30" rows="10" value={newPost.values.description} onChange={newPost.handleChange}></textarea>
                {newPost.errors.description && newPost.touched.description && <span className="formInput_error">* {newPost.errors.description}</span>}
                <div className="btn_description">
                    <p className="btn_description-text" ></p>
                    <input type="submit" className="btn_update" value="New Post" />
                </div>
            </form>
        </div >
    )
}

export default NewPost