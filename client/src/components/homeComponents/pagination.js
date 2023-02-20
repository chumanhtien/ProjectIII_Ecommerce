import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const {page, pages, keyword="", category} = props;

  return (
    pages > 1 && (
      <nav>
        <ul className={`pagination justify-content-center ${category === "vouchers" ? "voucher-pagination" : ""}`}>
          {
            [...Array(pages).keys()].map((x, index) => (
              <li className={`page-item ${x + 1 === page ? "active" : ""}`} key={x + 1}>
              <Link className="page-link" key={index} to={
                category ? (keyword ? `/${category}/search/${keyword}/page/${x + 1}` : `/${category}/page/${x + 1}`)
                        : (keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`)
              }>
                {x + 1}
              </Link>
          </li>
            ))
          }
          
          {/* <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              2
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              3
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              4
            </Link>
          </li>
          <li className={`page-item`}>
            <Link className="page-link" to={"#"}>
              5
            </Link>
          </li> */}
        </ul>
      </nav>
    )
    
  );
};

export default Pagination;
