import React, { useEffect, useState } from 'react'

import anh from '../asset/image/anh.jpg'

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
function ItemUser(props) {
    console.log(props.item);
    const { idMess, idUserFriend, statusRead } = props.item;
    const [dataFriend, setDataFriend] = useState(null);
    const [listMessage, setListMessage] = useState(null);
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
        getDataFriend();
        getDataMessage();
    }, []);
    const getDataFriend = () => {
        firebase.database().ref('users/' + idUserFriend).on('value', function (snapshot) {
            let data = {}
            data = snapshot.val()
            setDataFriend(data);
        });
        console.log(dataFriend);
    }
    const getDataMessage = () => {
        let mess = []
        firebase.database().ref('listMessage/' + idMess).on('value', function (snapshot) {
            mess = snapshot.val()
            setListMessage(mess.message);
        });
        console.log(listMessage);
    }
    return (
        dataFriend !== null &&
        <div className="friendItem" onClick={() => props.handlerMessChatVisible(dataFriend,idMess)}>
            <div className="boxAvatar">
                <img src={dataFriend.avatar.paraAvatar.url} alt="" />
                {dataFriend.isStatus.paraIsStatus === true ?
                    <span></span>
                    : <span style={{ backgroundColor: "#FFA34D" }}></span>
                }
            </div>
            <div className="friend_mess">
                <span>{dataFriend.name.paraName}</span>
                {listMessage !== null &&
                    <p style={{ fontWeight: "600" }}>{listMessage[listMessage.length - 1].mess}</p>
                }
                {/* <p style={{ fontWeight : "600" }}>chao cac ban nha Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, deleniti.</p> */}
                {/* <span style={{ fontWeight: "600" }}>receive call <box-icon name='bell-ring' type='solid' animation='tada' color="#F67575" size="xs"></box-icon></span> */}
                {/* <p>chao cac ban nha Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, deleniti.</p> */}
            </div>
        </div>
    )
}

export default ItemUser