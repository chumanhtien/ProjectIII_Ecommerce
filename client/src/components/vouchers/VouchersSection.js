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
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
// import CurrencyFormat from "react-currency-format";
import NewPagination from "../homeComponents/NewPagination";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { getListVouchersOfUser } from "../../Redux/Actions/VoucherActions";
import VoucherPagination from "../homeComponents/VoucherPagination";

const NUMBER_VOUCHERS_PER_PAGE = 4;

const VouchersSection = (props) => {
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
  const [newKeyword, setNewKeyword] = useState("");
  // console.log("keyword: ", keyword);

  const dispatch = useDispatch();
  const voucherList = useSelector((state) => state.voucherList);
  const {loading, error, vouchers} = voucherList;

  // const loading = false; const error = false;
  useEffect(() => {
    dispatch(getListVouchersOfUser());
  }, [dispatch]);

  let voucherItems = []
  if (vouchers) {
    voucherItems = vouchers
  }

  //  pagination
  if (voucherItems) {
    pages = voucherItems ? Math.ceil(voucherItems.length / NUMBER_VOUCHERS_PER_PAGE) : 0;
    // console.log(" News Pages: ", pages);
  }

  if (voucherItems && page) {
    voucherItems = voucherItems.slice((page - 1) * NUMBER_VOUCHERS_PER_PAGE, page * NUMBER_VOUCHERS_PER_PAGE);
  }

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(getListVouchersOfUser(newKeyword));
    // navigate(newKeyword ? (`/vouchers/search/keyword=\'${newKeyword}\'`): (`/vouchers`))
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
                            value={newKeyword}
                            className="form-control"
                            placeholder="Tìm kiếm mã giảm giá"
                            onChange={(e) => setNewKeyword(e.target.value)}
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
                        <div className={`voucher-section-item col-lg-6 col-md-11 col-sm-12 mt-2 voucher-card`}>
                          <div className={`d-flex flex-row border-product shadow-sm`}>
                            <div className={`p-2 col-3 d-flex text-center align-items-center voucher-left-header ${voucher.type === 1 ? "ship" : "discount"}`}>{voucher.type === 1 ? "Shipping Voucher" : "T-Ecommerce Voucher"}</div>
                            <div className="p-1 h-100 col-9">
                              <div className="p-1 h-80">
                                <div title={voucher._id} className="voucher-id">Mã: {voucher._id ? voucher._id : 'ID mã giảm giá'}</div>
                                <div title={voucher.name} className="voucher-name">{voucher.name ? voucher.name : "Tên"}</div>
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
                  <VoucherPagination
                    pages={pages}
                    page={page}
                    keyword={newKeyword ? newKeyword : ""}
                    filterByID={filterByID}
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
