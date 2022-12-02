import React from 'react'
import '../css/boxSelect.css'

const arrayProvinces = ['all', 'quang nam', 'da nang', 'quang ngai', 'hue', 'quang tri']
function BoxSelect({ valueOption, handlerFilter }) {
    return (
        <select className="filterData_select" name="province" id="province" onChange={(e) =>  handlerFilter(e)} value={valueOption}>
            {
                arrayProvinces.map(province => <option key={province} value={province}>{province}</option>)
            }
        </select>
    )
}

export default BoxSelect