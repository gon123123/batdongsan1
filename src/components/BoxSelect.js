import React from 'react'
import '../css/boxSelect.css'
function boxSelect() {
    return (
        <select className="filterData_select" name="province" id="province">
            <option value="da nang">da nang</option>
            <option value="quang tri">quang tri</option>
        </select>
    )
}

export default boxSelect