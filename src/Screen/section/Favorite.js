import React, { useEffect, useState } from 'react'

// component
import BoxCardFavorite from '../../components/BoxCardFavorite'
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import FavoriteRead from '../../components/FavoriteRead';

//asset
import loading from '../../asset/video/loading.gif';

import firebase from "firebase/app";
import { connectDatabase } from '../../helper/configDatabase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Favorite({ idUser }) {
    const [listMyFavorite, setListMyFavorite] = useState(null);
    const [listMyFavorite2, setListMyFavorite2] = useState(null);
    const [visibleContent, setVisibleContent] = useState({
        content: 0,
        key: null,
        data: null,
    });
    const [valueOption, setValueOption] = useState("all");
    const [listPagination, setListPagination] = useState([{ num: 1 }]);
    const [numPagination, setNumPagination] = useState(1);
    useEffect(() => {
        const getListMyPost = async () => {
            await firebase.database().ref('myFavorite/' + idUser + '/post').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                setListMyFavorite2(array);
                // hiển thị 1 phần boxCard 
                setListMyFavorite(array.slice(0, 4));
                console.log(array.length);
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
        getListMyPost();
    }, []);
    // xủ lý pagination 
    const handlerPagination = (pos) => {
        console.log(pos);
        setNumPagination(pos);
        setListMyFavorite(listMyFavorite2.slice((pos * 4 - 4), pos * 4));
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
    const handlerFilter = (param) => {
        let text = param.target.value;
        setValueOption(text)
        if (text === "all") {
            setListMyFavorite(listMyFavorite2);
        } else {
            let array = listMyFavorite2.filter((item) => {
                return item.province.toLowerCase().includes(text.toLowerCase());
            });
            setListMyFavorite(array);
        }
    }
    const HandlerVisible = (content) => {
        setVisibleContent({
            content: content.content,
            key: content.key,
            data: content.data,
        })
    }
    const VisibleContent = () => {
        if (visibleContent.content === 0) {
            return <div className="boxPost">
                <div className="filterData">
                    <p>province</p>
                    <BoxSelect handlerFilter={handlerFilter} valueOption={valueOption}></BoxSelect>
                </div>
                <p className="boxTitle">My Favorite</p>
                <div className="boxCard">
                    {
                        listMyFavorite === null
                            ? <img src={loading} style={{ width: "200px" }} alt="" />
                            : listMyFavorite.length === 0
                                ? <p>khong co bai viet nao dc dang</p>
                                :
                                listMyFavorite.map((item, index) => {
                                    return <BoxCardFavorite key={index} {...item}
                                        idUser={idUser}
                                        handler={HandlerVisible}
                                    ></BoxCardFavorite>
                                })
                    }
                </div>
                <div style={{ display: 'block' }}>
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
                </div>
                <br />
                <br />
                <br />
                {/* <p className="boxTitle">Waiting for approval</p> */}
                <div className="slider">
                </div>
            </div>
        } else if (visibleContent.content === 1) {
            return <FavoriteRead
                // idPost={visibleContent.key} 
                idUser={idUser} {...visibleContent.data}
            ></FavoriteRead>
        }
    }
    return (
        <div className="colSection">
            <VisibleContent></VisibleContent>
            <ToastContainer />
        </div>
    )
}

export default Favorite