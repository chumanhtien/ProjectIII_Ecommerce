import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../homeComponents/Rating";
import Pagination from "../homeComponents/pagination";
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
import NewPagination from "../homeComponents/NewPagination";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import Voucher from "./Voucher";

const NUMBER_NEWS_PER_PAGE = 3;

const VouchersSection = (props) => {
  const {category} = props;

  console.log(category)
  //Pagination
  let pages = 0;
  pages = 6;
  let page = Number(useParams().pageNumber);
  if (!page)
    page = 1;

  //Sort by
  const [filterByID, setFilterByID] = useState("");
  const [sortByTime, setSortByTime] = useState("");

  //Search
  const [keyword, setKeyword] = useState("");
  // console.log("keyword: ", keyword);

  // const dispatch = useDispatch();
  // const newsList = useSelector((state) => state.newsList);
  // const {loading, error, vouchers} = vouchersList;

  const loading = false; const error = false;
  useEffect(() => {
    // dispatch(getListNews());
  }, []);

  let voucherItems = [
  {
    _id: '001',
    name: 'Miễn phí vẫn chuyển',
    type: 1,
    description: 'Miễn phí vận chuyển (Lên tới 20k)',
    discount: 20,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '002',
    name: 'Giảm giá 50k',
    type: 3,
    description: 'Giảm giá 50k cho đơn hàng từ 500k trở lên',
    discount: 20,
    maxValue: 30,
    minValueOfOrderRequire: 500,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '003',
    name: 'Giảm giá 30k',
    type: 3,
    description: 'Giảm giá 30k cho đơn hàng của bạn',
    discount: 30,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '004',
    name: 'Giảm giá 50k',
    type: 3,
    description: 'Giảm giá 50k cho đơn hàng của bạn',
    discount: 50,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '005',
    name: 'Giảm giá 10%',
    type: 2,
    description: 'Giảm giá 10% cho đơn hàng của bạn, tối đa 50k',
    discount: 10,
    maxValue: 50,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 100*3600*24*1000
  },
  {
    _id: '006',
    name: 'Giảm giá 5%',
    type: 2,
    description: 'Giảm giá 5% cho đơn hàng của bạn, tối đa 40k',
    discount: 5,
    maxValue: 50,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*10000
  }
  ]


  // if (vouchers) {
  //   //Filter by ID
  //   switch(filterByID) {
  //     case 'noibo':
  //       newItems = news.filter((newItem) => newItem.source.id === 'noibo')
  //       break;
  //     case 'other':
  //       newItems = news.filter((newItem) => newItem.source.id !== 'noibo')
  //       break;
  //     default:
  //       newItems = news;
  //   }

  //   // console.log(newItems);

  //   //sortBy
  //   switch(sortByTime) {
  //     case 'newest':
  //       newItems = newItems.sort((a, b) => Number(moment(b.publishedAt).diff(moment(a.publishedAt))))
  //       break;
  //     case 'oldest':
  //       newItems = newItems.sort((a, b) => Number(moment(a.publishedAt).diff(moment(b.publishedAt))))
  //       break;
  //     default:
  //       newItems = newItems;
  //   }

    
  //   //
  //   if (newItems) {
  //     pages = newItems ? Math.ceil(newItems.length / NUMBER_NEWS_PER_PAGE) : 0;
  //     console.log(" News Pages: ", pages);
  //   }

  // }

  
  //panigation
  // if (newItems && page) {
  //   newItems = newItems.slice((page - 1) * NUMBER_NEWS_PER_PAGE, page * NUMBER_NEWS_PER_PAGE);
  // }

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(getListNews(keyword));
    // navigate(keyword ? (`/news/search/keyword=\'${keyword}\'`): (`/news`))
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
                            placeholder="Tìm kiếm mã giảm giá"
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
                              // setFilterByID(e.target.value);
                              // navigate(e.target.value ? `/news/${e.target.value}` : `/news`)
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
                    <div className=" voucher-list row col-lg-12 p-2">
                      {voucherItems && voucherItems.map((voucher, index) => (
                        // <div className="shop col-lg-6 col-md-6 col-sm-6 mt-4 voucher-card">
                        //   <div className="border-product shadow-sm">
                        //     <div className="d-flex flex-row h-100 w-100">
                        //       <div className="p-2 col-3 d-flex text-center align-items-center voucher-left-header ship">Shipping Voucher</div>
                        //       <div className="p-1 h-100 col-7">
                        //         <div className="p-1 h-80 text-info">
                        //           <div className="voucher-id">Mã: {voucher.id ? voucher.id : 'ID mã giảm giá'}</div>
                        //           <div className="voucher-name">{voucher.name ? voucher.name : "Tên"}</div>
                        //           <div className="voucher-description">{voucher.description ? voucher.description : "Mô tả"}</div>
                        //           <div className="voucher-expire">Hạn đến: {voucher?.expireAt ? `${moment(new Date(voucher.expireAt)).format("h:m:s")} ngày ${moment(new Date(voucher.expireAt)).format("D/M/Y")}` : ''}</div></div>
                        //         <div className="d-flex flex-column h-20">
                        //           <div className="d-flex flex-row justify-content-evenly">
                        //             {!voucher.isActive ?
                        //               <button
                        //                 onClick={() => console.log("active")}
                        //                 className="btn btn-success col-9">
                        //                 <span>KÍCH HOẠT</span>
                        //               </button> :
                        //               <button
                        //                 onClick={() => console.log("active")}
                        //                 className="btn btn-danger col-9">
                        //                 <span>HỦY KÍCH HOẠT</span>
                        //               </button>}
                        //           </div>
                        //         </div>
                        //       </div>
                        //       <div className="p-2 col-2 d-flex flex-column justify-content-evenly action">
                        //         <Link
                        //           to={`#`}
                        //           className="btn btn-sm btn-outline-success p-1 pb-2"
                        //         >
                        //           <i className="fas fa-eye"></i>
                        //           {/* <FontAwesomeIcon className="icon" icon={solid('eye')} /> */}
                        //         </Link>
                        //         <Link
                        //           to="#"
                        //           onClick={() => console.log("Delete voucher")}
                        //           className="btn btn-sm btn-outline-danger p-1 pb-2"
                        //         >
                        //           <i className="fas fa-trash"></i>
                        //           {/* <FontAwesomeIcon className="icon" icon={solid('trash')} /> */}
                        //         </Link>
                        //       </div>
                        //     </div>
                        //   </div>
                        // </div>
                        <div className={`voucher-section-item col-lg-6 col-md-6 col-sm-12 mt-2 voucher-card`}>
                          <div className={`d-flex flex-row border-product shadow-sm`}>
                            <div className={`p-2 col-3 d-flex text-center align-items-center voucher-left-header ${voucher.type === 1 ? "ship" : "discount"}`}>{voucher.type === 1 ? "Shipping Voucher" : "T-Ecommerce Voucher"}</div>
                            <div className="p-1 h-100 col-9">
                              <div className="p-1 h-80">
                                <div className="voucher-id">Mã: {voucher._id ? voucher._id : 'ID mã giảm giá'}</div>
                                <div className="voucher-name">{voucher.name ? voucher.name : "Tên"}</div>
                                <div className="voucher-description">{voucher.description ? voucher.description : "Mô tả"}</div>
                                <div className="voucher-abs">
                                  <div className="voucher-active">Trạng thái: <span >{voucher.isActive ? "Đang kích hoạt" : "Chưa kích hoạt"}</span></div>
                                  <div className="voucher-expire">Hạn đến: <i>{voucher?.expireAt ? `${moment(new Date(voucher.expireAt)).format("h:m:s")} ngày ${moment(new Date(voucher.expireAt)).format("D/M/Y")}` : ''}</i></div>
                                
                                </div>
                              </div>
                              {/* <div className="d-flex flex-column h-20">
                                <div className="d-flex flex-row justify-content-evenly">
                                  {!voucher.isActive ?
                                    <button
                                      onClick={() => console.log("active")}
                                      className="btn btn-success col-9">
                                      <span>KÍCH HOẠT</span>
                                    </button> :
                                    <button
                                      onClick={() => console.log("active")}
                                      className="btn btn-danger col-9">
                                      <span>HỦY KÍCH HOẠT</span>
                                    </button>}
                                </div>
                              </div> */}
                              
                            </div>
                            {/* <div className="p-1 d-flex justify-content-center align-item-center">
                              <input type="radio" value={voucher._id} id="voucher" name="voucher"  />
                            </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
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

export default VouchersSection;
