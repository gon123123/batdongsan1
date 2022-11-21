import React from 'react'
import '../css/LogRes.css'
import facebook from '../asset/image/facebook.png'
import google from '../asset/image/search.png'
import anh from '../asset/image/anh.jpg'
function Login() {
    return (
        <div className="box">
            <div className="colLeft">
                <img src={anh} alt="" />
            </div>
            <div className="colRight">
                <h3>Login</h3>
                <form action="/home">
                    <label htmlFor="email">email or phone</label>
                    <input type="email" placeholder="email or phone" />
                    <label htmlFor="pass">Password</label>
                    <input type="text" placeholder="password" />
                    <input type="submit" value="Sign In" />
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
                <a href="/register">
                    you do not have an account register here
                </a>
            </div>
        </div>
    )
}

export default Login