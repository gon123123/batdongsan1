import React, { useState } from 'react'
import '../../css/header.css'

function Header() {
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
    return (
        <div className="header">
            <div className="header_logo">
                <span className="header_logo-lg">SKY</span>
                <span className="header_logo-md">.HOUSE</span>
            </div>
            <div className="header_action">
                <a href="#1" className="header_action-actionItem">HOME</a>
                <a href="#about" className="header_action-actionItem">ABOUT US</a>
                <a href="#personnel" className="header_action-actionItem">PERSONNEL</a>
                <a href="#contacts" className="header_action-actionItem">CONTACTS</a>
            </div>
            <div className="header_button">
                <HandleButton></HandleButton>
            </div>
        </div>
    )
}

export default Header