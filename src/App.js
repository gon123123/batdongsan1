import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Screen/Home';
import Section from './Screen/Section';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useEffect, useState } from 'react';
import BoxAction from './components/BoxAction'

import firebase from "firebase/app";
import { connectDatabase } from './helper/configDatabase';

function App() {
    let navigate = useNavigate()
    const [emailUserLogin, setEmailUserLogin] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (emailUserLogin !== null) {
            console.log("co nguoi dang nhap");
            console.log(emailUserLogin);
            connectDatabase();

            const getListUser = async () => {
                await firebase.database().ref('users/').on('value', function (snapshot) {
                    let objUser = "";
                    snapshot.forEach(function (item) {
                        var childData = item.val();
                        if (childData.email === emailUserLogin) {
                            childData.idUser = item.key;
                            objUser = childData;
                        }
                    })
                    setUser(objUser);
                    console.log(objUser);
                    navigate('./home');
                })
            }
            getListUser();
        } else {
            console.log("ko co nguoi dang nhap");
            setUser(null);
        }
    }, [emailUserLogin]);
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
    }
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header {...user} setEmailUserLogin={setEmailUserLogin}></Header>
                        <Home></Home>
                        <Footer></Footer>
                    </>
                }></Route>
                <Route path="/home" element={
                    <>
                        {/* nếu chưa đang nhập hoặc đăng kí thì account là null , và hiển thị nav cũ không thì ngược lại */}
                        <Header {...user} setEmailUserLogin={setEmailUserLogin}></Header>
                        <div className="boxAction" id="action">
                            {user !== null ?
                                action.map(action => {
                                    if (action.id === 4) {
                                        if (user.isAdmin !== null && user.isAdmin === true) {
                                            return <BoxAction key={action.id} action={action} handleChange={handlerActive}></BoxAction>
                                        }
                                    } else {
                                        return <BoxAction key={action.id} action={action} handleChange={handlerActive}></BoxAction>
                                    }
                                })
                                : null
                            }
                        </div>
                        <Section section={section} {...user}></Section>
                        {visibleFooter && <Footer></Footer>}
                    </>
                }></Route>
                <Route path="/login" element={<Login setEmailUserLogin={setEmailUserLogin} ></Login>}></Route>
                <Route path="/register" element={<Register setEmailUserLogin={setEmailUserLogin} ></Register>}></Route>
            </Routes>
        </div>
    );
}

export default App;

