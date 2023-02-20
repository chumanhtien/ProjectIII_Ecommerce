import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
// import dtddProducts from "../../data/dtddProducts";
// import shoesProducts from "../../data/shoesProducts";
// import manclothesProducts from "../../data/manclothesProducts";
// import toysProducts from "../../data/toys";
// import babymomProducts from "../../data/babymom";
// import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { getListNews } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
// import CurrencyFormat from "react-currency-format";
import NewPagination from "./NewPagination";
import { useNavigate, useParams } from "react-router";
import moment from "moment";

const NUMBER_NEWS_PER_PAGE = 3;

const NewsSection = (props) => {
  const {category} = props;

  console.log(category)
  //Pagination
  let pages = 0;
  let page = Number(useParams().pageNumber);
  if (!page)
    page = 1;

  //Sort by
  const [filterByID, setFilterByID] = useState("");
  const [sortByTime, setSortByTime] = useState("");

  //Search
  const [keyword, setKeyword] = useState("");
  // console.log("keyword: ", keyword);

  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsList);
  const {loading, error, news} = newsList;
  useEffect(() => {
    dispatch(getListNews());
  }, [dispatch]);

  let newItems = []


  if (news) {
    //Filter by ID
    switch(filterByID) {
      case 'noibo':
        newItems = news.filter((newItem) => newItem.source.id === 'noibo')
        break;
      case 'other':
        newItems = news.filter((newItem) => newItem.source.id !== 'noibo')
        break;
      default:
        newItems = news;
    }

    // console.log(newItems);

    //sortBy
    switch(sortByTime) {
      case 'newest':
        newItems = newItems.sort((a, b) => Number(moment(b.publishedAt).diff(moment(a.publishedAt))))
        break;
      case 'oldest':
        newItems = newItems.sort((a, b) => Number(moment(a.publishedAt).diff(moment(b.publishedAt))))
        break;
      default:
        newItems = newItems;
    }

    
    //
    if (newItems) {
      pages = newItems ? Math.ceil(newItems.length / NUMBER_NEWS_PER_PAGE) : 0;
      console.log(" News Pages: ", pages);
    }

  }

  
  //panigation
  if (newItems && page) {
    newItems = newItems.slice((page - 1) * NUMBER_NEWS_PER_PAGE, page * NUMBER_NEWS_PER_PAGE);
  }

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getListNews(keyword));
    navigate(keyword ? (`/news/search/keyword=\'${keyword}\'`): (`/news`))
  }
  return (
    <>
      <div className="container">  
        <div className="section-news">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">  
              <div className="shopcontainer row">
                <header className="card-header bg-white">
                  <div className="row gx-3 py-3">
                    <div className="col-search col-lg-4 col-md-6 me-auto">
                      <form className="searchform" onSubmit={submitHandler}>
                        <div className="input-group">
                          <input
                            type="search"
                            value={keyword}
                            className="form-control"
                            placeholder="Tìm kiếm tin tức"
                            onChange={(e) => setKeyword(e.target.value)}
                          />
                          <button className="btn btn-dark" type="button" onClick={submitHandler}>
                            <i className="far fa-search" ></i>
                          </button>
                        </div>
                        
                      </form>
                    </div>
                    <div className="col-lg-2 col-4 col-md-3 new-filter">
                        <select 
                          className="form-select"
                          value={filterByID}
                          onChange={
                            (e) => {
                              setFilterByID(e.target.value);
                              navigate(e.target.value ? `/news/${e.target.value}` : `/news`)
                            }
                          }
                          
                          >
                          <option value={""}>Tất cả</option>
                          <option value={"noibo"}>Nội bộ</option>
                          <option value={"other"}>Nguồn khác</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-4 col-md-3 new-filter">
                      <select className="form-select" 
                        value={sortByTime}
                        onChange={(e) => setSortByTime(e.target.value)}
                        >
                        <option value={""}>Sắp xếp</option>
                        <option value={"newest"}>Gần đây nhất</option>
                        <option value={"oldest"}>Lâu nhất</option>
                      </select>
                    </div>
                  </div>
                </header>
                
                  {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
                    <>
                      {newItems && newItems.map((newItem, index) => (
                        <div className="shop col-lg-4 col-md-6 col-sm-6 mt-4">
                          <div className="border-product" key={index}>
                            { newItem.source.id !== 'noibo' ? (
                              <a href={newItem.url} target="_blank" rel="noreferrer">
                                <div className="shopBack">
                                <img src={newItem.urlToImage} alt={newItem.title} />
                                </div>
                              </a>
                            ) : (
                              <Link to={`/news/noibo/${newItem._id}`}>
                                <div className="shopBack">
                                  <img src={newItem.urlToImage} alt={newItem.title} />
                                </div>
                              </Link>
                            )
                              
                            }
                            
    
                            <div className="shoptext">
                                {newItem.source.id === "noibo" ? (
                                  <>
                                    <p className="mb-2">
                                      <Link className="text_name" title={newItem.title} to={`${newItem.url}/${newItem._id}`}>
                                          <b style={{"font-size": "20px"}}>{newItem.title}</b>
                                      </Link>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="mb-2">
                                      <a className="text_name" title={newItem.title} href={newItem.url} target="_blank" rel="noreferrer">
                                          <b style={{"font-size": "20px"}}>{newItem.title}</b>
                                      </a>
                                    </p>
                                  </>
                                )}
                                
                                <p className="product-info-detail mb-2">
                                    {newItem.description}
                                </p>
                                
                                {newItem.source.id === "noibo" ? (
                                  <>
                                    <p className="mb-2">
                                      <Link className="text_name" title={newItem.title} to={`${newItem.url}/${newItem._id}`}>
                                          <b style={{"font-size": "20px"}}>Xem thêm</b>
                                      </Link>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="mb-2">
                                      <a className="text_name" title={newItem.title} href={newItem.url} target="_blank" rel="noreferrer">
                                          <b style={{"font-size": "20px"}}>Xem thêm</b>
                                      </a>
                                    </p>
                                  </>
                                )}
                                {newItem.source.id === "noibo" ? (                               
                                  <div className="text-white btn btn-success mb-3">
                                    {`#${newItem.source.id}`}
                                  </div>                            
                                ) : (
                                  <div className="text-white btn btn-primary mb-3">
                                    {`#${newItem.source.id}`}
                                  </div>
                                )}
                                
                                <div className="product-info-detail text-end">
                                  <i>{`${moment(newItem.publishedAt).format("llll")}, ${newItem.source.name}`}</i>
                                </div>
                                <div className="product-info-detail text-end inline-block mb-1">
                                  <i>{`Tác giả: ${newItem.author}`}</i>
                                </div>
                              
                                {/* <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                                <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h3>{value}</h3>} /> */}
      
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                    
               
            
                {/* Pagination */}
                {pages > 1 && (
                  // <NewPagination
                  //   pages={pages} 
                  //   page={page} 
                    // keyword={keyword ? keyword : ""}
                    // filterByID={filterByID}
                  // />
                  <Pagination
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ""}
                    filterByID={filterByID}
                    category={category}
                  />
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsSection;
