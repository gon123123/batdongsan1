import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/LogRes.css';
import facebook from '../asset/image/facebook.png';
import google from '../asset/image/search.png';
import anh from '../asset/image/anh.jpg';

import firebase from "firebase/app";
import { connectDatabase } from '../helper/configDatabase';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register({ setEmailUserLogin }) {
    let navigate = useNavigate();
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

    const register = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(5, 'Invalid name length 😒')
                .max(35, 'Invalid name length 😒')
                .required('This field cannot be left blank'),
            email: Yup.string()
                .max(35, 'Invalid email length 😒')
                .required('This field cannot be left blank'),
            password: Yup.string()
                .min(8, 'Invalid name length 😒')
                .max(35, 'Invalid email length 😒')
                .required('This field cannot be left blank'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Password does not match !')
                .required('This field cannot be left blank'),
        }),
        onSubmit: (values) => {
            console.log(values);
            // kiem tra trung lap tai khoan
            if (listUsers !== null) {
                let kt = listUsers.some((item) => item.email === values.email);
                if (kt) {
                    toast.error('🔥 Duplicate account!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    let objNewUser = {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        avatar: {
                            url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
                            type: "link"
                        },
                        isAdmin: false,
                        isStatus: true,
                        listFriend: [],
                    }
                    firebase.database().ref('users/').push().set(
                        objNewUser
                        , function (err) {
                            if (err) {
                                alert("error: " + err);
                            } else {
                                setEmailUserLogin(values.email)
                            }
                        })
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
                <h3>Register</h3>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" value={register.values.name} onChange={register.handleChange} />
                    {register.errors.name && register.touched.name && <span className="formInput_error1">* {register.errors.name}</span>}
                    <label htmlFor="email">Email </label>
                    <input type="email" id="email" placeholder="Enter email" value={register.values.email} onChange={register.handleChange} />
                    {register.errors.email && register.touched.email && <span className="formInput_error1">* {register.errors.email}</span>}
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" autoComplete="on" value={register.values.password} onChange={register.handleChange} />
                    {register.errors.password && register.touched.password && <span className="formInput_error1">* {register.errors.password}</span>}
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" id="confirmPassword" autoComplete="on" value={register.values.confirmPassword} onChange={register.handleChange} />
                    {register.errors.confirmPassword && register.touched.confirmPassword && <span className="formInput_error1">* {register.errors.confirmPassword}</span>}
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
                <p className="link" onClick={() => navigate('/login')}>
                    you already have an account? login here
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register