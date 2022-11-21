import React from 'react';
import '../css/section.css';
import 'boxicons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import anhCard from '../asset/image/about1.jpg';
// component 
import Port from './section/Port';
import MyPort from './section/MyPort';

function Section(props) {
    console.log(props.section);
    const SectionVisible = () => { // sau co th truyen them props nua
        if (props.section === 0) {
            return <Port></Port>
        } else if (props.section === 1) {
            return <MyPort></MyPort>
        }
    }
    return (
        <div className="section">
            <SectionVisible></SectionVisible>
        </div>
    )
}

export default Section