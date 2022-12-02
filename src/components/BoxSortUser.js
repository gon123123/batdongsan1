import React from 'react';
import '../css/boxSelect.css';

const arrayProvinces = ['no', 'A-Z', 'Z-A'];
function BoxSelect({ valueOption, handlerFilter }) {
    return (
        <select className="filterData_select" onChange={(e) => handlerFilter(e)} value={valueOption}>
            {
                arrayProvinces.map(province => <option key={province} value={province}>{province}</option>)
            }
        </select>
    )
}

export default BoxSelect