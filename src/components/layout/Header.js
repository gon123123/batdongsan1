import React, { useState } from 'react'
import '../../css/header.css'

import anh from '../../asset/image/anh.jpg';

function Header() {
    console.log(localStorage.getItem('keyUser'));
    const account = JSON.parse(localStorage.getItem('account'));
    console.log(account);
    const [btnActive, setBtnActive] = useState(true);
    const handlerLogin = () => {
        window.location = "http://localhost:3000/login";
    }
    const handlerRegister = () => {
        window.location = "http://localhost:3000/register";
    }
    const HandleButton = () => {
        if (btnActive) {
            return (<>
                <button type="button" onClick={() => {
                    handlerRegister()
                    setBtnActive(false)
                }} className="header_button-action header_button-action--light">
                    Register
                </button>
                <button type="button" onClick={() => {
                    handlerLogin()
                    setBtnActive(true)
                }} className="header_button-action">
                    Login
                </button>
            </>)
        } else {
            return (<>
                <button type="button" onClick={() => {
                    handlerRegister()
                    setBtnActive(false)
                }} className="header_button-action">
                    Register
                </button>
                <button type="button" onClick={() => {
                    handlerLogin()
                    setBtnActive(true)
                }} className="header_button-action header_button-action--light">
                    Login
                </button>
            </>)
        }
    }
    // logout 
    const handlerLogout = () => {
        localStorage.clear();
        window.location = "http://localhost:3000/";
    }
    return (
        <div className="header">
            <div className="header_logo">
                <span className="header_logo-lg">SKY</span>
                <span className="header_logo-md">.HOUSE</span>
            </div>
            {account === null &&
                <div className="header_action">
                    <a href="#1" className="header_action-actionItem">HOME</a>
                    <a href="#about" className="header_action-actionItem">ABOUT US</a>
                    <a href="#personnel" className="header_action-actionItem">PERSONNEL</a>
                    <a href="#contacts" className="header_action-actionItem">CONTACTS</a>
                </div>
            }
            <div className="header_button">
                {account === null
                    ? <HandleButton></HandleButton>
                    : <div className="account">
                        {account.avatar.paraAvatar.type === "link"
                            ? <img src={account.avatar.paraAvatar.url} alt="" />
                            : <img src={anh} alt="" />}
                        <p>{account.name.paraName}</p>
                        <button type="button" id="up" style={{ display: "none" }} onClick={() => {
                            document.getElementById("option").style.visibility = "hidden"
                            document.getElementById("down").style.display = "block"
                            document.getElementById("up").style.display = "none"
                        }}><box-icon type='solid' name='chevron-up'></box-icon></button>
                        <button type="button" id="down" onClick={() => {
                            document.getElementById("option").style.visibility = "visible"
                            document.getElementById("up").style.display = "block"
                            document.getElementById("down").style.display = "none"
                        }}><box-icon type='solid' name='chevron-down'></box-icon></button>
                        <div className="option" id="option" style={{ visibility: "hidden" }}>
                            <div className="optionItem">
                                <box-icon type='solid' name='cog' color="#1eb2a6"></box-icon>
                                <p>Setting</p>
                            </div>
                            <div className="optionItem" onClick={() => handlerLogout()}>
                                <box-icon name='log-out' color="#FFA34D"></box-icon>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header