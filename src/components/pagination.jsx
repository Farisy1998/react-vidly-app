import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // lodash is a optimised utity library of earlier
//  JS library called underscore, for manipulate
// arrays, numbers, strings and objects in JS

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1, 1); // range(start, end, no: of steps ahead);
  return (
    <React.Fragment>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a onClick={() => onPageChange(page)} className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
