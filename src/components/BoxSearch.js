import React from 'react'
import '../css/boxSearch.css'

function BoxSearch({handlerSearch}) {
    return (
        <div className="filterData_search">
            <input className="search_input" type="text" name="title" onChange={(e) => handlerSearch(e)} placeholder="enter value..." />
            <div className="search_icon">
                <box-icon name='search' color="#FFFFFF"></box-icon>
            </div>
        </div>
    )
}

export default BoxSearch