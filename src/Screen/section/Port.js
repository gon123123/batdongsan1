import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';

// component 
import BoxCardItem from '../../components/BoxCardItem'
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import Description from '../../components/Description';

// asset 
import loading from '../../asset/video/loading.gif'

import firebase from "firebase/app";
import { connectDatabase } from '../../helper/configDatabase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Port({ idUser }) {
    const [listPost, setListPost] = useState(null);
    const [listPost2, setListPost2] = useState(null);
    const [readPost, setReadPost] = useState({
        read: false,
        data: null,
    });
    const [valueOption, setValueOption] = useState("all");
    const [listPagination, setListPagination] = useState([{ num: 1 }]);
    const [numPagination, setNumPagination] = useState(1);
    useEffect(() => {
        const getListPost = async () => {
            await firebase.database().ref('post/').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                setListPost2(array);
                // hiển thị 1 phần boxCard 
                setListPost(array.slice(0, 4));
                console.log(array);
                // xử lý pagination 
                let array2 = [];
                let num = Math.ceil(array.length / 4);
                for (let i = 0; i < num; i++) {
                    array2.push({ num: i + 1 });
                }
                setListPagination(array2);
            })
        }
        connectDatabase();
        getListPost();
    }, []);
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
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
    // đọc chi tiết bảng tin
    const HandlerRead = (data) => {
        setReadPost({
            read: true,
            data: data,
        })
    }
    // handler search 
    // const handlerSearch = (param) => {
    //     let text = param.target.value;
    //     console.log(text);
    //     if (text === "") {
    //         setListPost(listPost2);
    //     } else {
    //         let array = listPost2.filter((item) => {
    //             return item.address.toLowerCase().includes(text.toLowerCase());
    //         });
    //         setListPost(array);
    //     }
    // }
    const handlerFilter = (param) => {
        let text = param.target.value;
        setValueOption(text)
        if (text === "all") {
            setListPost(listPost2);
        } else {
            let array = listPost2.filter((item) => {
                return item.province.toLowerCase().includes(text.toLowerCase());
            });
            setListPost(array);
        }
    }
    // xủ lý pagination 
    const handlerPagination = (pos) => {
        console.log(pos);
        setNumPagination(pos);
        setListPost(listPost2.slice((pos * 4 - 4), pos * 4));
    }
    const handlerPaginationNext = () => {
        if (numPagination === listPagination.length) {
            handlerPagination(numPagination)
        } else {
            let pos = numPagination + 1;
            handlerPagination(pos);
        }
    }
    const handlerPaginationPrevious = () => {
        if (numPagination === 1) {
            handlerPagination(1)
        } else {
            let pos = numPagination - 1;
            handlerPagination(pos);
        }
    }

    const HandlerVisible = () => {
        if (readPost.read) {
            return <Description {...readPost.data} idUser={idUser}></Description>
        } else {
            return <div className="boxPost">
                <div className="filterData">
                    <p>province</p>
                    <BoxSelect handlerFilter={handlerFilter} valueOption={valueOption}></BoxSelect>
                </div>
                <p className="boxTitle">Post</p>
                <div className="boxCard">
                    {
                        listPost === null
                            ? <img src={loading} style={{ width: '200px' }} alt="" />
                            : listPost.length === 0
                                ? <p>khong co bai viet nao dc dang</p>
                                :
                                listPost.map((item, index) => {
                                    return <BoxCardItem key={index} {...item}
                                        handler={HandlerRead}
                                    ></BoxCardItem>
                                })
                    }
                </div>
                <div className="pagination">
                    <span onClick={() => handlerPaginationPrevious()}>«</span>
                    {listPagination.map((item, index) => {
                        if (numPagination === (index + 1)) {
                            return <span key={item.num} className="active" onClick={() => handlerPagination(item.num)}>{item.num}</span>
                        } else {
                            return <span key={item.num} onClick={() => handlerPagination(item.num)}>{item.num}</span>
                        }
                    }
                    )}
                    <span onClick={() => handlerPaginationNext()}>»</span>
                </div>
                <p className="boxTitle">Featured Posts</p>
                <div className="slider">
                    <Slider {...settings}>
                        {
                            listPost2 === null
                                ? <img src={loading} style={{ width: '200px' }} alt="" />
                                : listPost2.length === 0
                                    ? <p>khong co bai viet nao dc dang</p>
                                    :
                                    listPost2.map((item, index) => {
                                        return <BoxCardItem key={index} {...item}
                                            handler={HandlerRead}
                                        ></BoxCardItem>
                                    })
                        }
                    </Slider>
                </div>
            </div>
        }
    }
    return (
        <div className="colSection">
            <HandlerVisible></HandlerVisible>
            <ToastContainer />
        </div>
    )
}

export default Port