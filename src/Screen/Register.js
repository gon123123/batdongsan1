import React from 'react'
import '../css/LogRes.css'
import facebook from '../asset/image/facebook.png'
import google from '../asset/image/search.png'
import anh from '../asset/image/anh.jpg'
function Register() {
    return (
        <div className="box">
            <div className="colLeft">
                <img src={anh} alt="" />
            </div>
            <div className="colRight">
                <h3>Register</h3>
                <form action="/home">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="email or phone" />
                    <label htmlFor="email">Email or phone</label>
                    <input type="text" placeholder="email or phone" />
                    <label htmlFor="pass">Password</label>
                    <input type="text" placeholder="password" />
                    <label htmlFor="pass">Confirm password</label>
                    <input type="text" placeholder="password" />
                    <input type="submit" value="Sign In" onClick={()=> window.location = "http://localhost:3000/home"}/>
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