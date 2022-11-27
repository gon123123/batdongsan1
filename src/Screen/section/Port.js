import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

import BoxCardItem from '../../components/BoxCardItem'
import Pagination from '../../components/Pagination';
import BoxSearch from '../../components/BoxSearch';
import BoxSelect from '../../components/BoxSelect';

import Description from '../../components/Description';

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
function Port() {
    const keyUser = localStorage.getItem("keyUser");
    const account = JSON.parse(localStorage.getItem("account")); // thông tin của người đang dùng
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
        getPost();
        getListFavorite();
    }, []);
    const [listPost, setListPost] = useState(null);
    const [listFavorite, setListFavorite] = useState(null);
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
    const handlerFavorite = (data) => {
        setListFavorite(listFavorite.push(data));
        firebase.database().ref('favorite/' + keyUser).set(
            {
                // push() sẽ bổ sung cho id
                favorite: listFavorite
            }, function (error) {
                if (error) {
                    alert('error' + error);
                } else {
                    alert('success')
                }
            });
    }

    // đọc chi tiết bảng tin
    const HandlerRead = (data) => {
        setReadPost({
            read: true,
            data: data,
        })
    }
    // xử lý Chat 
    const [object1, setObject1] = useState("");
    const [object2, setObject2] = useState("");
    const handlerChat = (idYour) => {
        console.log("id cua nguoi chat" + idYour);
        // lấy thông tin bản thân
        let object1 = {};
        firebase.database().ref('users/' + keyUser).on('value', function (snapshot) {
            object1 = snapshot.val()
            setObject1(snapshot.val());
        })
        // lấy thông tin đối phương
        let object2 = {};
        firebase.database().ref('users/' + idYour).on('value', function (snapshot) {
            object2 = snapshot.val()
            setObject2(snapshot.val());
        });
        // tạo id Hội thoại
        var keyMess = firebase.database().ref().child('users').push().key; // tạo key mess cho 2 người
        // tạo đối tượng bạn cho người đang dùng 
        const addFriend1 = {
            idMess: keyMess,
            idUserFriend: idYour,
            statusRead: {
                statusRead: true,
            }
        }
        // tạo đối tượng cho người được chat
        const addFriend2 = {
            idMess: keyMess,
            idUserFriend: keyUser,
            statusRead: {
                statusRead: false,
            }
        }
        // kiểm tra xem hai bên đã có ai có bạn chưa 
        if (object1.listFriend === undefined && object2.listFriend === undefined) {
            // nếu chưa 
            firebase.database().ref('users/' + keyUser).set({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: [addFriend1],
            })
            // cập nhật lại local
            localStorage.setItem("account", JSON.stringify({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: [addFriend1],
            }))
            firebase.database().ref('users/' + idYour).set({
                name: object2.name,
                email: object2.email,
                password: object2.password,
                avatar: object2.avatar,
                isAdmin: object2.isAdmin,
                isStatus: object2.isStatus,
                listFriend: [addFriend2],
            })
            // tin nhan dau tien
            var date = new Date();
            var time = date.getHours() + ':' + date.getMinutes();
            let message = {
                idUser: keyUser,
                type: "text",
                mess: 'xin chao',
                time: time,
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            }
            firebase.database().ref('listMessage/' + keyMess).set({
                message: [message]
            });
            window.location = "http://localhost:3000/home"
        } else if (object1.listFriend !== undefined && object2.listFriend === undefined) {
            console.log("case1")
            console.log(object1.listFriend);
            let listFriendMe = object1.listFriend // lấy danh sách friend me chuẩn bị cập nhật lại
            listFriendMe.push(addFriend1);

            firebase.database().ref('users/' + keyUser).set({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: listFriendMe,
            })
            console.log(
                {
                    name: object1.name,
                    email: object1.email,
                    password: object1.password,
                    avatar: object1.avatar,
                    isAdmin: object1.isAdmin,
                    isStatus: object1.isStatus,
                    listFriend: listFriendMe,
                }
            )
            // cập nhật lại local
            localStorage.setItem("account", JSON.stringify({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: listFriendMe,
            }))
            firebase.database().ref('users/' + idYour).set({
                name: object2.name,
                email: object2.email,
                password: object2.password,
                avatar: object2.avatar,
                isAdmin: object2.isAdmin,
                isStatus: object2.isStatus,
                listFriend: [addFriend2],
            }
            )
            console.log({
                name: object2.name,
                email: object2.email,
                password: object2.password,
                avatar: object2.avatar,
                isAdmin: object2.isAdmin,
                isStatus: object2.isStatus,
                listFriend: [addFriend2],
            })
            // tin nhan dau tien
            var date = new Date();
            var time = date.getHours() + ':' + date.getMinutes();
            let message = {
                idUser: keyUser,
                type: "text",
                mess: 'xin chao',
                time: time,
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            }
            firebase.database().ref('listMessage/' + keyMess).set({
                message: [message]
            });
            window.location = "http://localhost:3000/home"
        } else if (object1.listFriend === undefined && object2.listFriend !== undefined) {
            console.log("case2")
            console.log(object2.listFriend);
            let listFriendYou = object2.listFriend // lấy danh sách friend me chuẩn bị cập nhật lại
            listFriendYou.push(addFriend2);

            firebase.database().ref('users/' + keyUser).set({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: addFriend1,
            })
            console.log(
                {
                    name: object1.name,
                    email: object1.email,
                    password: object1.password,
                    avatar: object1.avatar,
                    isAdmin: object1.isAdmin,
                    isStatus: object1.isStatus,
                    listFriend: addFriend1,
                }
            )
            // cập nhật lại local
            localStorage.setItem("account", JSON.stringify({
                name: object1.name,
                email: object1.email,
                password: object1.password,
                avatar: object1.avatar,
                isAdmin: object1.isAdmin,
                isStatus: object1.isStatus,
                listFriend: addFriend1,
            }))
            firebase.database().ref('users/' + idYour).set({
                name: object2.name,
                email: object2.email,
                password: object2.password,
                avatar: object2.avatar,
                isAdmin: object2.isAdmin,
                isStatus: object2.isStatus,
                listFriend: listFriendYou,
            }
            )
            console.log({
                name: object2.name,
                email: object2.email,
                password: object2.password,
                avatar: object2.avatar,
                isAdmin: object2.isAdmin,
                isStatus: object2.isStatus,
                listFriend: listFriendYou,
            })
            // tin nhan dau tien
            var date = new Date();
            var time = date.getHours() + ':' + date.getMinutes();
            let message = {
                idUser: keyUser,
                type: "text",
                mess: 'xin chao',
                time: time,
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
            }
            firebase.database().ref('listMessage/' + keyMess).set({
                message: [message]
            });
            window.location = "http://localhost:3000/home"
        } else if (object1.listFriend !== undefined && object2.listFriend !== undefined) {
            let listFriendMe = object1.listFriend;
            let listFriendYou = object2.listFriend;
            let len1 = listFriendMe.length;
            let len2 = listFriendYou.length;
            let ktID = false;
            let idMess = '';

            for (let i = 0; i < len1; i++) {
                if (listFriendMe[i].idUserFriend == idYour) {
                    idMess = listFriendMe[i].idMess;
                    ktID = true;
                    break;
                }
            }
            if (ktID) {
                console.log('co');
            } else {
                // không trung nên add cho cả 2 người 
                let listFriendMe = object1.listFriend; // chuan bi add them 1 ban cho nguoi dang dung
                listFriendMe.push(addFriend1);
                firebase.database().ref('users/' + keyUser).set({
                    name: object1.name,
                    email: object1.email,
                    password: object1.password,
                    avatar: object1.avatar,
                    isAdmin: object1.isAdmin,
                    isStatus: object1.isStatus,
                    listFriend: listFriendMe,
                })
                let listFriendYou = object2.listFriend // lấy danh sách friend me chuẩn bị cập nhật lại
                listFriendYou.push(addFriend2);
                firebase.database().ref('users/' + idYour).set({
                    name: object2.name,
                    email: object2.email,
                    password: object2.password,
                    avatar: object2.avatar,
                    isAdmin: object2.isAdmin,
                    isStatus: object2.isStatus,
                    listFriend: listFriendYou,
                })
                // tin nhan dau tien
                var date = new Date();
                var time = date.getHours() + ':' + date.getMinutes();
                let message = {
                    idUser: keyUser,
                    type: "text",
                    mess: 'xin chao',
                    time: time,
                    date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                }
                firebase.database().ref('listMessage/' + keyMess).set({
                    message: [message]
                });
            }
        }

    }
    const HandlerVisible = () => {
        if (readPost.read) {
            return <Description data={readPost.data} handlerFavorite={handlerFavorite} handlerChat={handlerChat}></Description>
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
                <p className="boxTitle">Post</p>
                <div className="boxCard">
                    {
                        listPost === null || listPost.length === 0
                            ? <p>khong co bai viet nao dc dang</p>
                            :
                            listPost.map((item, index) => {
                                return <BoxCardItem key={index} data={item} handler={HandlerRead}></BoxCardItem>
                            })
                    }
                </div>
                <Pagination></Pagination>
                <p className="boxTitle">Featured Posts</p>
                <div className="slider">
                    <Slider {...settings}>
                        {/* <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem>
        <BoxCardItem></BoxCardItem> */}
                    </Slider>
                </div>
            </div>
        }
    }
    return (
        <div className="colSection">
            <HandlerVisible></HandlerVisible>
        </div>
    )
}

export default Port