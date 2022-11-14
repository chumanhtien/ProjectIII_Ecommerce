import React from "react";
import { Link } from "react-router-dom";

const NewPagination = (props) => {
  const {page, pages, keyword, filterByID} = props;

  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {
            [...Array(pages).keys()].map((x, index) => (
              <li className={`page-item ${x + 1 === page ? "active" : ""}`} key={x + 1}>
              <Link className="page-link" key={index} to={
                (filterByID ? (keyword ? `/news/${filterByID}/search/keyword=\'${keyword}\'/page/${x + 1}` : `/news/${filterByID}/page/${x + 1}`)
                : (keyword ? `/news/search/keyword=\'${keyword}\'/page/${x + 1}` : `/news/page/${x + 1}`))
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

export default NewPagination;
