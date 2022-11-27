import React, { useEffect, useState } from 'react'

import "boxicons"

// import component 
import Modal from '../../components/Modal';
import ItemUser from '../../components/ItemUser';
// css
import '../../css/message.css'

import anh from '../../asset/image/anh.jpg';

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

function Message() {
    const keyUser = localStorage.getItem("keyUser");
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("account")));
    const [visibleChat, setVisibleChat] = useState(false);
    const [dataBoxChat, setDataBoxChat] = useState(null);
    const [listMessage, setListMessage] = useState(null);
    const [idMess, setIdMess] = useState(null);
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
        getDataUser();
    }, []);
    const getDataUser = () => {
        firebase.database().ref('users/' + keyUser).on('value', function (snapshot) {
            let data = {}
            data = snapshot.val()
            setDataUser(data);
        });
        console.log(dataUser);
    }
    // xử lý cuộc gọi 
    const [actionVisible, setActionVisible] = useState({
        modal: false,
        reSizeMode: false,
        video: true,
        mic: true,
    });
    // bắt đầu gọi và xác định xem có sử dụng camera không 
    const handlerCallVoice = (input) => {
        console.log('button');
        setActionVisible({ ...actionVisible, modal: input.modal, video: input.video });
    }
    const handlerVideo = (isVideo) => {
        setActionVisible({ ...actionVisible, video: isVideo });
    }
    const handlerMic = (isMic) => {
        setActionVisible({ ...actionVisible, mic: isMic });
    }
    const handlerMessChatVisible = (dataFriend, idMess) => {
        setDataBoxChat(dataFriend);
        setIdMess(idMess);
        let mess = [];
        firebase.database().ref('listMessage/' + idMess).on('value', function (snapshot) {
            mess = snapshot.val();
            setListMessage(mess.message);
        });
        console.log(listMessage);
    }
    const [messageTextarea, setMessageTextarea] = useState(null);
    const handlerMessage = (e) => {
        setMessageTextarea(e.target.value);
    }
    const sendMessage = () => {
        var date = new Date();
        var time = date.getHours() + ':' + date.getMinutes();
        let message = {
            idUser: keyUser,
            type: "text",
            mess: messageTextarea,
            time: time,
            date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        }
        let newMess = [];
        newMess = listMessage;
        newMess.push(message);

        firebase.database().ref('listMessage/' + idMess).set({
            message: newMess
        });
        setMessageTextarea("");
    }
    return (
        <div className="colSection">
            {actionVisible.modal ?
                <Modal actionVisible={actionVisible} handlerCallVoice={handlerCallVoice} handlerVideo={handlerVideo} handlerMic={handlerMic}></Modal>
                : <div className="visibleChat">
                    <div className="boxChat">
                        {dataBoxChat !== null &&
                            <>
                                <div className="chatTitle">
                                    <div className="infoFriend">
                                        <img src={dataBoxChat.avatar.paraAvatar.url} alt="" />
                                        <p>{dataBoxChat.name.paraName}</p>
                                        {dataBoxChat.isStatus.paraIsStatus === true
                                            ? <span></span>
                                            : <span style={{ backgroundColor: "#FFA34D" }}></span>
                                        }
                                    </div>
                                    <div className="callFriend">
                                        <button type="button" onClick={() => handlerCallVoice({ modal: true, video: false })}>
                                            <box-icon name='phone-call' type='solid' color="#FFA34D" ></box-icon>
                                        </button>
                                        <button type="button" onClick={() => handlerCallVoice({ modal: true, video: true })}>
                                            <box-icon name='video' type='solid' color="#FFA34D" ></box-icon>
                                        </button>
                                    </div>
                                </div>
                                <div className="boxMessage" id="messBottom">
                                    {/* {listMessage !== null &&
                                        // <div><p className="messageRight">{listMessage[0].mess}<span className="time">{listMessage[0].time}</span></p></div>
                                        listMessage.map((item, index) => <div key={index}><p className="messageRight">{item.mess}<span className="time">{item.time}</span></p></div>
                                        )
                                    } */}
                                    {listMessage !== null &&
                                        listMessage.map((item, index) =>
                                            item.type === "text"
                                                ?
                                                item.idUser === keyUser
                                                    ? <div key={index}><p className="messageRight">{item.mess}<span className="time">{item.time}</span></p></div>
                                                    : <div key={index}><p className="messageLeft">{item.mess}<span className="time">{item.time}</span></p></div>
                                                :
                                                item.idUser === keyUser
                                                    ? <p className="messageRight" key={index}>
                                                        <span className="messageCall">
                                                            <box-icon name='phone-outgoing' type='solid' color="#F67575"></box-icon>
                                                            <span>&nbsp;&nbsp; you made the call</span>
                                                        </span>
                                                        <span className="time">12:78</span>
                                                    </p>
                                                    : <p className="messageLeft" key={index}>
                                                        <span className="messageCall">
                                                            <span>i want to call you &nbsp;&nbsp;</span>
                                                            <box-icon name='phone' type='solid' animation='tada' color="#F67575"></box-icon>
                                                        </span>
                                                        <button className="receiveCall">receive call</button>
                                                        <span className="time">12:78</span>
                                                    </p>
                                        )
                                    }
                                    <p className="messageRight" style={{ backgroundColor: "#FFFFFF" }}></p>
                                </div>
                                <div className="boxSendMess">
                                    <textarea name="" id="" cols="30" rows="1" onChange={(e) => handlerMessage(e)} value={messageTextarea}></textarea>
                                    <button type="button" onClick={() => sendMessage()}><box-icon name='send' type='solid' size="md" color="#1eb2a6"></box-icon></button>
                                </div>
                            </>
                        }
                    </div>
                    <div className="boxFriend">
                        <div className="boxSearch">
                            <input className="searchInput" type="text" name="title" onChange={() => { }} placeholder="enter title..." />
                            <div className="search_icon">
                                <box-icon name='search' color="#FFFFFF"></box-icon>
                            </div>
                        </div>
                        <div className="arrData_friend">
                            {dataUser === null
                                ? <p>khong co ai</p>
                                : dataUser.listFriend !== undefined && dataUser.listFriend.map((item, index) => <ItemUser key={index} item={item} handlerMessChatVisible={handlerMessChatVisible}></ItemUser>)
                            }
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Message