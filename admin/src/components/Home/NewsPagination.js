import React from "react";
import { Link } from "react-router-dom";

const NewsPagination = (props) => {
  const {page, pages, filterByID, pathName, keyword} = props;
  
  console.log(page);
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
            <li className="page-item">
                <Link className={`page-link ${page > 1 ? "enabled" : "disabled"}`}
                    to={keyword ? filterByID ? (`/${pathName}/${filterByID}/search/keyword='${keyword}'/page/${page - 1}`) 
                        : (`/${pathName}/search/keyword='${keyword}'/page/${page - 1}`)
                        : filterByID ? (`/${pathName}/${filterByID}/page/${page - 1}`) : (`/${pathName}/page/${page - 1}`)}
                >
                    Trang trước
                </Link>
            </li>
          {
            
            [...Array(pages).keys()].map((x, index) => (
            <li className={`page-item ${Number(x + 1) === Number(page) ? "active" : ""}`} key={x + 1}>
                <Link className="page-link" 
                to={ keyword ? filterByID ? (`/${pathName}/${filterByID}/search/keyword=\'${keyword}\'/page/${x + 1}`) 
                  : (`/${pathName}/search/keyword='${keyword}'/page/${x + 1}`)
                  : filterByID ? (`/${pathName}/${filterByID}/page/${x + 1}`) : (`/${pathName}/page/${x + 1}`)
            }>
                    {x + 1}
                </Link>
            </li>
            ))
          }
            <li className="page-item">
                <Link className={`page-link ${page < pages ? "enabled" : "disabled"}`}
                    to={keyword ? filterByID ? (`/${pathName}/${filterByID}/search/keyword=\'${keyword}\'/page/${page + 1}`) 
                    : (`/${pathName}/search/keyword='${keyword}'/page/${page + 1}`)
                    : filterByID ? (`/${pathName}/${filterByID}/page/${page + 1}`) : (`/${pathName}/page/${page + 1}`)}
                >
                    Trang sau
                </Link>
            </li>
          
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

export default NewsPagination;
