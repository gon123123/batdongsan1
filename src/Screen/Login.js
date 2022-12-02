import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../css/LogRes.css'
import facebook from '../asset/image/facebook.png'
import google from '../asset/image/search.png'
import anh from '../asset/image/anh.jpg'

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login({ setEmailUserLogin }) {
    let navigate = useNavigate()
    const [listUsers, setListUsers] = useState(null);

    useEffect(() => {
        const getListUser = async () => {
            await firebase.database().ref('users/').on('value', function (snapshot) {
                let array = [];
                snapshot.forEach(function (item) {
                    var childData = item.val();
                    array.push(childData);
                })
                setListUsers(array);
            })
        }
        connectDatabase();
        getListUser();
    }, []);
    const login = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(35, 'Invalid email length 😒')
                .required('This field cannot be left blank'),
            password: Yup.string()
                .min(8, 'Invalid name length 😒')
                .max(35, 'Invalid email length 😒')
                .required('This field cannot be left blank'),
        }),
        onSubmit: (values) => {
            console.log(values);
            if (listUsers !== null) {
                let kt = listUsers.some(item => item.email === values.email && item.password === values.password);

                if (kt) {
                    setEmailUserLogin(values.email);
                } else {
                    toast.error('😭 Account does not exist!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        }
    })
    return (
        <div className="box">
            <div className="colLeft">
                <img src={anh} alt="" />
            </div>
            <div className="colRight">
                <p className="backHome" onClick={() => navigate('/')}>
                    Back Home
                </p>
                <h3>Login</h3>
                <form onSubmit={login.handleSubmit}>
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" placeholder="Enter email" value={login.values.email} onChange={login.handleChange} />
                    {login.errors.email && login.touched.email && <span className="formInput_error1">* {login.errors.email}</span>}
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" autoComplete="on" value={login.values.password} onChange={login.handleChange} />
                    {login.errors.password && login.touched.password && <span className="formInput_error1">* {login.errors.password}</span>}
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
                <p className="link" onClick={() => navigate('/register')}>
                    you do not have an account register here
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login