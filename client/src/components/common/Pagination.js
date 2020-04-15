import React from "react";
import './Pagination.css';
const Pagination = ({ postPerpage, totalPost, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="row pag">
      <div className='col-md-12'>
      <nav >
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a
                onClick={() => {
                  paginate(number);
                }}
                // href="!#"
                className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      </div>
    </div>
  );
};
export default Pagination;
