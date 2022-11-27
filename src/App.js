import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Screen/Home';
import Section from './Screen/Section';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useEffect, useState } from 'react';
import BoxAction from './components/BoxAction'

// firebase 
import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
function App() {
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
    }, []);
    const [section, setSection] = useState(0);
    const [action, setAction] = useState([
        {
            id: 0,
            title: "Post",
            nameLogo: "store-alt",
            active: true,
        },
        {
            id: 1,
            title: "My Post",
            nameLogo: "copy-alt",
            active: false,
        },
        {
            id: 2,
            title: "Favorite",
            nameLogo: "heart",
            active: false,
        },
        {
            id: 3,
            title: "Message",
            nameLogo: "message-square-dots",
            active: false,
        },
        {
            id: 4,
            title: "Dashboard",
            nameLogo: "dashboard",
            active: false,
        },
        {
            id: 5,
            title: "Setting",
            nameLogo: "cog",
            active: false,
        },
    ]);
    const [visibleFooter, setVisibleFooter] = useState(true);
    const handlerActive = (id) => {
        if (id === 3) {
            setVisibleFooter(false);
        } else {
            setVisibleFooter(true);
        }
        let data = [];
        for (const iterator of action) {
            if (iterator.id === id) {
                iterator.active = true;
            } else {
                iterator.active = false;
            }
            data.push(iterator);
        }
        setAction(data);
        setSection(id);
        console.log(action);
    }
    // handler register 
    const [keyUser, setKeyUser] = useState(""); // id người dùng đăng kí mới 
    var accountUser = {}
    const [newAccountUser, setNewAccountUser] = useState({
        name: {
            paraName: ""
        },
        email: {
            paraEmail: ""
        },
        password: {
            paraPassword: ""
        },
        avatar: {
            paraAvatar: {
                url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
                type: "link"
            }
        },
        isAdmin: {
            paraIsAdmin: false,
        },
        isStatus: {
            paraIsStatus: true,
        },
        listFriend: [],
    });
    const addAccount = (account) => {
        accountUser = account;
        console.log("chao");
        console.log(account);
        console.log(newAccountUser);
        var keyNew = firebase.database().ref().child('users').push().key;
        // lưu keyUser vao localStore
        localStorage.setItem('keyUser', keyNew);
        localStorage.setItem('account', JSON.stringify(account));
        setKeyUser(keyNew);  // để có thể lưu trữ key tại đây thì không dùng push trực tiếp mà phải tạo ra key từ push
        firebase.database().ref('users/' + keyNew).set(
            {
                // push() sẽ bổ sung cho id
                ...newAccountUser
            }, function (error) {
                if (error) {
                    alert('error' + error);
                } else {
                    alert('success')
                    // setNewAccountUser(newAccountUser)
                    window.location = "http://localhost:3000/home";
                }
            });
    }
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header></Header>
                        <Home></Home>
                        <Footer></Footer>
                    </>
                }></Route>
                <Route path="/home" element={
                    <>
                        {/* nếu chưa đang nhập hoặc đăng kí thì account là null , và hiển thị nav cũ không thì ngược lại */}
                        <Header></Header>
                        <div className="boxAction" id="action">
                            {
                                action.map(action => {
                                    return <BoxAction key={action.id} action={action} handleChange={handlerActive}></BoxAction>
                                })
                            }
                        </div>
                        <Section section={section}></Section>
                        {visibleFooter && <Footer></Footer>}
                    </>
                }></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register addAccount={addAccount} setNewAccountUser={setNewAccountUser} newAccountUser={newAccountUser}></Register>}></Route>
            </Routes>
        </div>
    );
}

export default App;

