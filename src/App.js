import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Screen/Home';
import Session from './Screen/Session';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useState } from 'react';
import BoxAction from './components/BoxAction'
function App() {
    const [session, setSession] = useState(0);
    const [action, setAction] = useState([{ id: 0, title: "Menu", nameLogo: "grid", active: true, },
    {
        id: 1,
        title: "post",
        nameLogo: "grid",
        active: false,
    },
    {
        id: 2,
        title: "My Post",
        nameLogo: "grid",
        active: false,
    },
    {
        id: 3,
        title: "Menu",
        nameLogo: "grid",
        active: false,
    },
    {
        id: 4,
        title: "Menu",
        nameLogo: "grid",
        active: false,
    },
    ]);
    const handlerActive = (id) => {
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
        setSession(id);
        console.log(action);
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
                        <Header></Header>
                        <div className="boxAction" id="action">
                            {
                                action.map(action => {
                                    return <BoxAction key={action.id} action={action} handleChange={handlerActive}></BoxAction>
                                })
                            }
                        </div>
                        <Session section={session}></Session>
                        <Footer></Footer>
                    </>
                }></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
            </Routes>
        </div>
    );
}

export default App;

