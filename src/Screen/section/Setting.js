import React, { useEffect, useState } from 'react';


//asset
// css 
import '../../css/setting.css';

import 'boxicons';
import firebase from "firebase/app";
import { connectDatabase } from '../../helper/configDatabase';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Setting({ idUser }) {
    const [inFoUser, setInFoUser] = useState(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    useEffect(() => {
        const getInfoUser = async () => {
            await firebase.database().ref('users/' + idUser).on('value', (snapshot) => {
                setInFoUser(snapshot.val());
                setImage(snapshot.val().avatar.url);
                setName(snapshot.val().name);
            })
        }
        connectDatabase();
        getInfoUser();
    }, []);
    const chooseImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result.toString())
        }
        reader.readAsDataURL(file);
    }
    const handlerUpdateUser = () => {
        console.log("vip")
        if (name === " " || name === "" || name.length < 4) {
            toast.warn('name length is not enough!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (image === null) {
                toast.warn('choose avatar!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
            }
            let updates = {};
            updates['users/' + idUser + '/name'] = name;
            updates['users/' + idUser + '/avatar/url'] = image;
            firebase.database().ref().update(updates,
                function (err) {
                    if (err) {

                    } else {
                        toast.success('update success!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            );
        }
    }
    return (
        <div className="colSection">
            <div className="boxPost">
                <p className="boxTitle">Profile</p>
                <div className="setting">
                    <div className="image">
                        {image === null
                            ? <div className="chooseImage">
                                <label htmlFor="choose">
                                    <box-icon type='solid' name='image-add' size="md" color="#ffa34d"></box-icon>
                                </label>
                                <input type="file" id="choose" style={{ display: 'none' }} onChange={(e) => chooseImage(e)} accept="image/jpeg, image/png," />
                            </div>
                            : <img src={image} alt="" />
                        }
                        <button type="button" className="btnClear" onClick={() => setImage(null)}>Clear</button>
                    </div>
                    {inFoUser !== null
                        ? <div className="profile">
                            <div className="settingName">
                                <p>name :</p> <input type="text" max="35" defaultValue={inFoUser.name} onChange={(e) => setName(e.target.value.trim())} />
                            </div>
                            <p>email : <span>{inFoUser.email}</span></p>
                            <p>permission : <span>{inFoUser.isAdmin ? 'admin' : 'user'}</span></p>
                            <p>status : <span>{inFoUser.isStatus ? 'online' : 'offline'}</span></p>
                        </div>
                        : null
                    }
                </div>
                <button type="button" className="buttonUpdate" onClick={() => handlerUpdateUser()}>update</button>
                <div className="slider"></div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Setting

