import React, { useEffect, useState } from 'react'

import anh from '../asset/image/anh.jpg'

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

function ItemUser({ idFriend, name, idMess, idUser, handlerMessChatVisible }) {
    const [dataFriend, setDataFriend] = useState(null);
    const [listMessage, setListMessage] = useState(null);
    useEffect(() => {
        // lấy dữ liệu của friend
        const getDataFriend = async () => {
            firebase.database().ref('users/' + idFriend).on('value', function (snapshot) {
                setDataFriend(snapshot.val());
            });
        }
        const getDataMessage = async () => {
            await firebase.database().ref('listMessage/' + idMess).on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                console.log(array);
                setListMessage(array);
            });
        }
        connectDatabase();
        getDataFriend();
        getDataMessage();
    }, []);
    return (
        dataFriend !== null &&
        <div className="friendItem" onClick={() => handlerMessChatVisible(dataFriend, idMess, idFriend)}>
            <div className="boxAvatar">
                <img src={dataFriend.avatar.url} alt="" />
                {dataFriend.isStatus === true ?
                    <span></span>
                    : <span style={{ backgroundColor: "#FFA34D" }}></span>
                }
            </div>
            <div className="friend_mess">
                <span>{name}</span>
                {
                    (listMessage !== null && listMessage.length !== 0)
                        ?
                        listMessage[listMessage.length - 1].type == "text"
                            ? listMessage[listMessage.length - 1].idUser === idUser
                                ? <p >{listMessage[listMessage.length - 1].mess}</p>
                                : <p style={{ fontWeight: "600" }}>{listMessage[listMessage.length - 1].mess}</p>
                            : listMessage[listMessage.length - 1].idUser === idUser
                                ? <span style={{ fontWeight: "600" }}>calling <box-icon name='phone' type='solid' animation='tada' color="#F67575" size="xs"></box-icon></span>
                                : <span style={{ fontWeight: "600" }}>receive call <box-icon name='bell-ring' type='solid' animation='tada' color="#F67575" size="xs"></box-icon></span>
                        : null
                }
            </div>
        </div>
    )
}

export default ItemUser