import React, { useEffect, useState } from 'react';

import "boxicons";

// import component 
import ItemUser from '../../components/ItemUser';
import Modal from '../../components/Modal';
// css
import '../../css/message.css';

import loading from '../../asset/video/loading.gif';

import firebase from "firebase/app";
import { connectDatabase } from '../../helper/configDatabase';

import 'react-toastify/dist/ReactToastify.css';

import { Peer } from 'peerjs';
import { openStream } from '../../helper/callVideo';

function Message({ idUser }) {
    const [messageTextarea, setMessageTextarea] = useState(null);
    const [listMessage, setListMessage] = useState(null);
    const [listFriend, setListFriend] = useState(null);
    const [listFriend2, setListFriend2] = useState(null);
    const [dataBoxChat, setDataBoxChat] = useState(null);
    const [idMess, setIdMess] = useState(null);

    const [idFriend, setIdFriend] = useState(null);
    const [idPeer, setIdPeer] = useState(null);
    // xử lý cuộc gọi 
    const [actionVisible, setActionVisible] = useState({
        modal: false,
        reSizeMode: false,
        video: true,
        mic: true,
    });
    const [ketthuc, setKetThuc] = useState(false);
    console.log("render 2");
    useEffect(() => {
        const getListMyFriend = async () => {
            await firebase.database().ref('users/' + idUser + '/listFriend').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                setListFriend(array);
                setListFriend2(array);
                console.log(listFriend);
            })
        }
        connectDatabase();
        getListMyFriend();
    }, []);
    useEffect(() => {
        peer.on('open', id => {
            console.log('id ', id);
            setIdPeer(id)
        })
    }, [ketthuc]);
    useEffect(() => {
        if (listMessage != null && listMessage.length !== 0) {
            if (listMessage[listMessage.length - 1].type === "call_end") {
                setActionVisible({ ...actionVisible, modal: false, video: true });
            }
        }
    }, [listMessage]);
    // khởi tạo peer 
    // sau nay gắn id của user của mình vào đây , ai muốn gọi mình thì phải biết cài này 
    const peer = new Peer();
    // bắt đầu gọi và xác định xem có sử dụng camera không 
    const handlerCallVoice = async (input) => {
        const d = new Date();
        let idMessItem = firebase.database().ref().child('listMessage').push().key;
        if (input.modal === true) {
            await firebase.database().ref('listMessage/' + idMess + '/' + idMessItem).set(
                {
                    idMessItem: idMessItem,
                    idUser: idUser,
                    type: "call",
                    mess: idPeer,
                    time: d.getHours() + ":" + d.getMinutes(),
                    date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
                }
            )
        } else {
            var stream = document.getElementById("videoLocal").srcObject;
            var tracks = stream.getTracks();
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }
            document.getElementById("videoLocal").srcObject = null;
            setActionVisible({ ...actionVisible, modal: false, video: true });
            await firebase.database().ref('listMessage/' + idMess + '/' + idMessItem).set(
                {
                    idMessItem: idMessItem,
                    idUser: idUser,
                    type: "call_end",
                    mess: "call ended",
                    time: d.getHours() + ":" + d.getMinutes(),
                    date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
                }
            )
            setKetThuc(!ketthuc)
        }
    }
    // handlerReceive 
    const handlerReceive = (idCuocGoi) => {
        console.log('id ', idCuocGoi);
        setActionVisible({ ...actionVisible, modal: true, video: true });
        openStream() // cấu hình , yêu cầu quyền phương tiện 
            .then(stream => {
                document.getElementById("videoLocal").srcObject = stream; // video của mình 
                const call = peer.call(idCuocGoi, stream); // id của đối phương
                call.on("stream", (remoteStream) => {                      // nhận video họ
                    document.getElementById("videoRemote").srcObject = remoteStream; // xem video của họ 
                });
            })
            .catch(error => {
                console.error(error);
            })
    }
    // lúc họ gọi mình 
    peer.on("call", (call) => {
        setActionVisible({ ...actionVisible, modal: true, video: true });
        openStream()
            .then(stream => { // 
                call.answer(stream);
                document.getElementById("videoLocal").srcObject = stream; // video của mình 
                call.on("stream", (remoteStream) => {
                    document.getElementById("videoRemote").srcObject = remoteStream; // xem video của họ 
                })
            })
    })
    // bật tắt camera 
    const handlerVideo = (isVideo) => {
        setActionVisible({ ...actionVisible, video: isVideo });
    }
    // bật tắt mic 
    const handlerMic = (isMic) => {
        setActionVisible({ ...actionVisible, mic: isMic });
    }
    // hiển thị tin nhắn ra chatBox 
    const handlerMessChatVisible = async (dataFriend, idMessPara, idFriendPara) => {
        setDataBoxChat(dataFriend);
        setIdMess(idMessPara);
        setIdFriend(idFriendPara)
        setMessageTextarea("");

        await firebase.database().ref('listMessage/' + idMessPara).on('value', function (snapshot) {
            let array = [];
            snapshot.forEach(function (item) {
                var childData = item.val();
                array.push(childData);
            })
            setListMessage(array);
        });
    }
    // xử lý tin nhắn đang nhập 
    const handlerMessage = (e) => {
        setMessageTextarea(e.target.value);
    }
    const sendMessage = () => {
        const d = new Date();
        let idMessItem = firebase.database().ref().child('listMessage').push().key;
        firebase.database().ref('listMessage/' + idMess + '/' + idMessItem).set(
            {
                idMessItem: idMessItem,
                idUser: idUser,
                type: "text",
                mess: messageTextarea,
                time: d.getHours() + ":" + d.getMinutes(),
                date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
            }
        )
    }
    const handlerSearch = (param) => {
        let text = param.target.value;
        if (text === "") {
            setListFriend(listFriend2);
        } else {
            let array = listFriend2.filter((item) => {
                return item.name.toLowerCase().includes(text.toLowerCase());
            });
            console.log(array);
            setListFriend(array);
        }
    }
    return (
        <div className="colSection">
            {actionVisible.modal ?
                <Modal {...actionVisible}
                    handlerCallVoice={handlerCallVoice}
                    handlerVideo={handlerVideo}
                    handlerMic={handlerMic}
                ></Modal>
                : <div className="visibleChat">
                    <div className="boxChat">
                        {dataBoxChat !== null &&
                            <>
                                <div className="chatTitle">
                                    <div className="infoFriend">
                                        <img src={dataBoxChat.avatar.url} alt="" />
                                        <p>{dataBoxChat.name}</p>
                                        {dataBoxChat.isStatus === true
                                            ? <span></span>
                                            : <span style={{ backgroundColor: "#FFA34D" }}></span>
                                        }
                                    </div>
                                    <div className="callFriend">
                                        <button type="button" onClick={() => handlerCallVoice({ modal: true, video: true })}>
                                            <box-icon name='video' type='solid' color="#FFA34D" ></box-icon>
                                        </button>
                                    </div>
                                </div>
                                {listMessage === null ?
                                    <div className="boxMessage_loading" id="messBottom">
                                        <img src={loading} style={{ width: "150px" }} alt="" />
                                    </div>
                                    : listMessage.length === 0
                                        ?
                                        <div className="boxMessage_loading" id="messBottom">
                                            <p>Hay nhắn gì đó cho bạn kia</p>
                                        </div>
                                        :
                                        <div className="boxMessage" id="messBottom">
                                            {
                                                listMessage.map((item, index) =>
                                                    item.type === "text"
                                                        ?
                                                        item.idUser === idUser
                                                            ? <div key={index}><p className="messageRight">{item.mess}<span className="time">{item.time}</span></p></div>
                                                            : <div key={index}><p className="messageLeft">{item.mess}<span className="time">{item.time}</span></p></div>
                                                        :
                                                        item.idUser === idUser
                                                            ? <p className="messageRight" key={index}>
                                                                <span className="messageCall">
                                                                    <box-icon name='phone-outgoing' type='solid' color="#F67575"></box-icon>
                                                                    <span>&nbsp;&nbsp; you made the call</span>
                                                                </span>
                                                                <span className="time">{item.time}</span>
                                                            </p>
                                                            : <p className="messageLeft" key={index}>
                                                                <span className="messageCall">
                                                                    <span>i want to call you &nbsp;&nbsp;</span>
                                                                    <box-icon name='phone' type='solid' animation='tada' color="#F67575"></box-icon>
                                                                </span>
                                                                <button className="receiveCall" onClick={() => handlerReceive(item.mess)}>receive call</button>
                                                                <span className="time">{item.time}</span>
                                                            </p>
                                                )
                                            }
                                        </div>
                                }
                                {/* <p className="messageRight" style={{ backgroundColor: "#FFFFFF" }}></p> */}
                                <div className="boxSendMess">
                                    <textarea name="" id="" cols="30" rows="1" onChange={(e) => handlerMessage(e)
                                    }
                                        defaultValue={messageTextarea}
                                    ></textarea>
                                    <button type="button" onClick={() => sendMessage()}><box-icon name='send' type='solid' size="md" color="#1eb2a6"></box-icon></button>
                                </div>
                            </>
                        }
                    </div>
                    <div className="boxFriend">
                        <div className="boxSearch">
                            <input className="searchInput" type="text" name="title" onChange={(e) => handlerSearch(e)} placeholder="enter title..." />
                            <div className="search_icon">
                                <box-icon name='search' color="#FFFFFF"></box-icon>
                            </div>
                        </div>
                        <div className="arrData_friend">
                            {listFriend === null
                                ? <p>khong co ai</p>
                                : listFriend.map((item, index) => <ItemUser key={index} {...item} idUser={idUser}
                                    handlerMessChatVisible={handlerMessChatVisible}
                                ></ItemUser>)
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Message
