import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/header.css';

function Header({ name, avatar, setEmailUserLogin }) {

    let navigate = useNavigate();
    const [btnActive, setBtnActive] = useState(true);

    const handlerLogin = () => {
        navigate("/login");
    }
    // 
    const handlerRegister = () => {
        navigate("/register")
    }
    // logout 
    const handlerLogout = () => {
        setEmailUserLogin(null);
        navigate("/")
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
    return (
        <div className="header">
            <div className="header_logo">
                <span className="header_logo-lg">SKY</span>
                <span className="header_logo-md">.HOUSE</span>
            </div>
            {name === undefined ?
                <div className="header_action">
                    <a href="#first" className="header_action-actionItem">HOME</a>
                    <a href="#about" className="header_action-actionItem">ABOUT US</a>
                    <a href="#personnel" className="header_action-actionItem">PERSONNEL</a>
                    <a href="#contacts" className="header_action-actionItem">CONTACTS</a>
                </div>
                : null
            }
            <div className="header_button">
                {name === undefined ?
                    <HandleButton></HandleButton>
                    :
                    <div className="account">
                        <img src={avatar.url} alt="" />
                        <p>{name}</p>
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
                            {/* <div className="optionItem">
                                <box-icon type='solid' name='cog' color="#1eb2a6"></box-icon>
                                <p>Setting</p>
                            </div> */}
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


