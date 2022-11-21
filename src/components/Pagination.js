import React from 'react'
import '../css/pagination.css';

function Pagination() {
  return (
    <div className="pagination">
    <a href="#1">«</a>
    <a href="#1">1</a>
    <a className="active" href="#1">2</a>
    <a href="#1">3</a>
    <a href="#1">4</a>
    <a href="#1">5</a>
    <a href="#1">6</a>
    <a href="#1">»</a>
</div>
  )
}

export default Pagination