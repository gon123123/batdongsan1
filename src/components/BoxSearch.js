import React from 'react'
import '../css/boxSearch.css'

function BoxSearch() {
    return (
        <div className="filterData_search">
            <input className="search_input" type="text" name="title" onChange={() => { }} placeholder="enter title..." />
            <div className="search_icon">
                <box-icon name='search' color="#FFFFFF"></box-icon>
            </div>
        </div>
    )
}

export default BoxSearch