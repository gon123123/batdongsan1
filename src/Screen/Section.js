import React from 'react';
import '../css/section.css';
import 'boxicons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import anhCard from '../asset/image/about1.jpg';
// component section
import Port from './section/Port';
import MyPort from './section/MyPort';
import Favorite from './section/Favorite';
import Message from './section/Message';
import Dashboard from './section/Dashboard'
import Setting from './section/Setting'

function Section({ section, idUser }) {
    console.log(section);
    const SectionVisible = () => { // sau co th truyen them props nua
        if (section === 0) {
            return <Port idUser={idUser}></Port>
        } else if (section === 1) {
            return <MyPort idUser={idUser}></MyPort>
        } else if (section === 2) {
            return <Favorite idUser={idUser} ></Favorite>
        } else if (section === 3) {
            return <Message idUser={idUser}></Message>
        } else if (section === 4) {
            return <Dashboard idUser={idUser}></Dashboard>
        } else if (section === 5) {
            return <Setting idUser={idUser}></Setting>
        }
    }
    return (
        <div className="section">
            <SectionVisible></SectionVisible>
        </div>
    )
}

export default Section