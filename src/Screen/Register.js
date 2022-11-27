import React, { useEffect, useState } from 'react'
import '../css/LogRes.css'
import facebook from '../asset/image/facebook.png'
import google from '../asset/image/search.png'
import anh from '../asset/image/anh.jpg'

import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

function Register(props) {
    const [listUsers, setListUsers] = useState(null);

    // const data = {
    //     name: "minh tuan",
    //     email: "bmt@gmail.com",
    //     password: "12345678",
    //     avatar: {
    //         paraAvatar: {
    //             url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    //             type: "link"
    //         }
    //     },
    //     isAdmin: {
    //         paraIsAdmin: true,
    //     },
    //     isStatus: {
    //         paraIsStatus: true,
    //     },
    //     listFriend: [
    //         {
    //             idMess: "jwfaojweijfpoaew",
    //             idUserFriend: "jijejoigogj",
    //             statusRead: {
    //                 paraStatus: false
    //             }
    //         }
    //     ],
    // }
    // console.log(data);
    // const data2 = { ...data, password: { paraPassword: "emochamhoi" }, isAdmin: { paraIsAdmin: false }, avatar: { paraAvatar: { url: "http://", type: 'base64' } } }
    // console.log(data2);
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
            console.log("ket noi thanh cong");
        }
        getListUser();
    }, []);
    const getListUser = () => {
        firebase.database().ref('users/').on('value', (snapshot) => {
            let arrCPList = []
            snapshot.forEach(function (itemUser) {
                var childData = itemUser.val();
                arrCPList.push({
                    idUser: itemUser.key,
                    name: childData.name.paraName,
                    email: childData.email.paraEmail,
                    password: childData.password.paraPassword,
                    avatar: childData.avatar.paraAvatar,
                    isAdmin: childData.isAdmin.paraIsAdmin,
                    isStatus: childData.isStatus.paraIsStatus,
                    listFriend: childData.listFriend,
                })
            })
            setListUsers(arrCPList);
            console.log(listUsers);
        })
    }
    return (
        <div className="box">
            <div className="colLeft">
                <img src={anh} alt="" />
            </div>
            <div className="colRight">
                <h3>Register</h3>
                <form action="/home">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name" onChange={(e) => props.setNewAccountUser({ ...props.newAccountUser, name: { paraName: e.target.value } })} />
                    <label htmlFor="email">Email </label>
                    <input type="text" placeholder="Enter email" onChange={(e) => props.setNewAccountUser({ ...props.newAccountUser, email: { paraEmail: e.target.value } })} />
                    <label htmlFor="pass">Password</label>
                    <input type="text" placeholder="password" onChange={(e) => props.setNewAccountUser({ ...props.newAccountUser, password: { paraPassword: e.target.value } })} />
                    <label htmlFor="pass">Confirm password</label>
                    <input type="text" placeholder="password" />
                    <input type="button" value="Sign In" onClick={() => props.addAccount(props.newAccountUser) } />
                </form>
                <div className="or">
                    <span></span>
                    <p>or log in with</p>
                    <span></span>
                </div>
                <div className="with">
                    <img src={facebook} alt="" />
                    <img src={google} alt="" />
                </div>
                <div className="or">
                    <p>Forgot or password ?</p>
                </div>
                <a href="/login">
                    you already have an account? login here
                </a>
            </div>
        </div>
    )
}

export default Register