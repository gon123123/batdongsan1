import React, { useEffect, useState } from 'react'

import BoxCardItem2button from '../../components/BoxCard2button';
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import DescriptionUpdate from '../../components/DescriptionUpdate';
import NewPost from '../../components/NewPost';

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
function MyPort() {
    const keyUser = localStorage.getItem("keyUser");
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
        getMyPost();
        getPost();
    }, []);
    const [listMyPost, setListMyPost] = useState(null);
    const [listPost, setListPost] = useState(null);
    const getMyPost = () => {
        firebase.database().ref('myPost/' + keyUser).on('value', (snapshot) => {
            let arrCPList = []
            snapshot.forEach(function (itemMyPort) {
                arrCPList = itemMyPort.val();
            })
            setListMyPost(arrCPList);
            console.log("danh sach myPost");
            console.log(arrCPList);
        })
    }
    const getPost = () => {
        firebase.database().ref('posts/').on('value', (snapshot) => {
            let arrCPList = []
            snapshot.forEach(function (itemMyPort) {
                arrCPList = itemMyPort.val();
            })
            setListPost(arrCPList);
            console.log("danh sach post");
            console.log(arrCPList);
        })
    }
    const [visibleContent, setVisibleContent] = useState({
        content: 0,
        data: null,
    })
    const [data, setData] = useState([
        {
            idPost: "fawuehfihiawuefh",
            image: [],
            title: "Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "17/11/2022",
            map: "470 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 4550,
            province: "Da nang",
            star: 4,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            idPost: "ghhvahweuhfhweifhi",
            image: [],
            title: "2 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "18/11/2022",
            map: "550 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 750,
            province: "Da nang",
            star: 5,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
        {
            idPost: "chhvahwhfiaw",
            image: [],
            title: "3 Bán ccmn nhà trọ cho thuê 5 tầng 9 ngủ tại Ô Chợ Dừa - Đê La Thành - Đống Đa - HN 50tr/ tháng",
            date: "19/11/2022",
            map: "980 tran dai nghia quan ngu hanh son ",
            price: 58757585887,
            area: 50,
            province: "Quang Nam",
            star: 1,
            description: "- Vị trí cách đường ô tô: Xã Đàn - ngã 6 Ô Chợ Dừa 100m, ngõ 298 Đê La Thành ngay trung tâm thành phố HN. - Nhà dịch vụ cao cấp An House Homestay 5 tầng, bds dòng tiền đang cho thuê 50tr/ tháng, hợp đồng dài hạn. - Sẵn 100% tiện ích đồ dùng sinh hoạt: Bàn ghế gỗ, ghế sofa, /chăn ga gối đệm/tủ bát, tủ bếp, tủ quần áo/lò vi sóng, bếp từ, nồi nấu bếp từ, hút mùi, nóng lạnh, điều hoà, quạt trần/ máy giặt, máy sấy quần áo. - Liên hệ chính chủ để xem nhà nhanh gọn, không qua môi giới."
        },
    ])
    const HandlerVisible = (content) => {
        setVisibleContent({
            content: content.content,
            index: content.index,
        })
    }
    const handlerUpdate = (dataUpdate) => {
        let temDataUpdate = data;
        temDataUpdate = data.map(item => {
            if (item.idPost == dataUpdate.idPost) {
                return dataUpdate
            }
            return item;
        })
        console.log(temDataUpdate); // cai nay dung cho database 
        setData(temDataUpdate);
        console.log(data);
    }
    const handlerNewPost = (newPostagru) => {
        const d = new Date();
        const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
        // tao id cho myPost
        var idPost = firebase.database().ref().child('myPost').push().key;
        setListMyPost(listMyPost.push({ ...newPostagru, date: date, idUser: keyUser, idMyPost: idPost })); // cho myPost
        setListPost(listPost.push({ ...newPostagru, date: date, idUser: keyUser, idMyPost: idPost })); // cho Post
        console.log(listMyPost);
        firebase.database().ref('myPost/' + keyUser).set({
            // push() sẽ bổ sung cho id
            post: listMyPost
        }, function (error) {
            if (error) {
                alert('error' + error);
            } else {
                alert('success');
                firebase.database().ref('posts/').set({
                    post: listPost
                })
            }
        });
    }
    const VisibleContent = () => {
        if (visibleContent.content === 0) {
            return <div className="boxPost">
                <div className="filterData">
                    {/* <select className="filterData_select" name="price" id="price">
        <option value="increase">increase</option>
        <option value="reduce">reduce</option>
    </select> */}
                    <BoxSelect></BoxSelect>
                    <BoxSearch></BoxSearch>
                </div>
                <p className="boxTitle">My Post</p>
                <div className="boxCard">
                    {
                        listMyPost === null || listMyPost.length === 0
                            ? <p>khong co bai viet nao dc dang</p>
                            :
                            listMyPost.map((item, index) => {
                                return <BoxCardItem2button key={index} data={item} index={index} handler={HandlerVisible}></BoxCardItem2button>
                            })
                    }
                </div>
                <div style={{ display: 'block' }}>
                    <Pagination></Pagination>
                </div>
                <br />
                <br />
                <br />
                <button onClick={() => HandlerVisible({
                    content: 2,
                    index: null,
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
                    {/* <div className="boxTable">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>num</th>
                                    <th>name</th>
                                    <th>process</th>
                                    <th>start</th>
                                    <th>view</th>
                                    <th>del</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ban ccmn nhaf tro thue 5 tang..</td>
                                    <td>success</td>
                                    <td>
                                        <div className="star">
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table">view</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table del">del</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ban ccmn nhaf tro thue 5 tang..</td>
                                    <td>success</td>
                                    <td>
                                        <div className="star">
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>&nbsp;
                                            <box-icon name='star' type='solid' color="#FFA34D" size="xs"> </box-icon>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table">view</button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn_table del">del</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Pagination></Pagination> */}
                </div>
            </div>
        } else if (visibleContent.content === 1) {
            return <DescriptionUpdate data={listMyPost[visibleContent.index]} handlerUpdate={handlerUpdate}></DescriptionUpdate>
        } else if (visibleContent.content === 2) {
            return <NewPost handlerNewPost={handlerNewPost}></NewPost>
        }
    }
    return (
        <div className="colSection">
            <VisibleContent></VisibleContent>
        </div>
    )
}
export default MyPort