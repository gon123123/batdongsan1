import React, { useEffect, useState } from 'react'

// component 
import BoxCardItem2button from '../../components/BoxCard2button';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import DescriptionUpdate from '../../components/DescriptionUpdate';
import NewPost from '../../components/NewPost';

//asset
import loading from '../../asset/video/loading.gif'

import firebase from "firebase/app";
import { connectDatabase } from '../../helper/configDatabase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyPort({ idUser }) {
    const [listMyPost, setListMyPost] = useState(null);
    const [listMyPost2, setListMyPost2] = useState(null);
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
            await firebase.database().ref('myPost/' + idUser + '/post').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                setListMyPost2(array);
                // hiển thị 1 phần data
                setListMyPost(array.slice(0, 4));
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
    const handlerFilter = (param) => {
        let text = param.target.value;
        setValueOption(text)
        if (text === "all") {
            setListMyPost(listMyPost2);
        } else {
            let array = listMyPost2.filter((item) => {
                return item.province.toLowerCase().includes(text.toLowerCase());
            });
            setListMyPost(array);
        }
    }
    // xủ lý pagination 
    const handlerPagination = (pos) => {
        console.log(pos);
        setNumPagination(pos);
        setListMyPost(listMyPost2.slice((pos * 4 - 4), pos * 4));
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
                <p className="boxTitle">My Post</p>
                <div className="boxCard">
                    {
                        listMyPost === null
                            ? <img src={loading} style={{ width: "200px" }} alt="" />
                            : listMyPost.length === 0
                                ? <p>khong co bai viet nao dc dang</p>
                                :
                                listMyPost.map((item, index) => {
                                    return <BoxCardItem2button key={index} {...item}
                                        idUser={idUser}
                                        handler={HandlerVisible}
                                    ></BoxCardItem2button>
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
                <button onClick={() => HandlerVisible({
                    content: 2,
                    key: null,
                })} type="button" className="btn_addPost" style={
                    {
                        backgroundColor: "#1eb2a6",
                        padding: "3px 10px 3px 10px",
                        border: "none",
                        borderRadius: "3px",
                        fontWeight: "500",
                        color: " #ffffff",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                        clear: "both"
                    }
                }>New Post +</button>
                {/* <p className="boxTitle">Waiting for approval</p> */}
                <div className="slider">
                </div>
            </div>
        } else if (visibleContent.content === 1) {
            return <DescriptionUpdate idPost={visibleContent.key} idUser={idUser} {...visibleContent.data}></DescriptionUpdate>
        } else if (visibleContent.content === 2) {
            return <NewPost idUser={idUser}></NewPost>
        }
    }
    return (
        <div className="colSection">
            <VisibleContent></VisibleContent>
        </div>
    )
}
export default MyPort

