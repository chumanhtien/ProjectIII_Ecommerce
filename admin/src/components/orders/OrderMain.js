import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Redux/Actions/OrderActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import Pagination from "../Home/Pagination.js";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import NewsPagination from "../Home/NewsPagination";

const NUMBER_ORDERS_PER_PAGE = 6;

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const {loading, error, orders} = orderList;

  const [paidStatus, setPaidStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  
  // console.log("paid: ", paidStatus);
  // console.log("status: ", orderStatus);
  // console.log("time: ", sortBy);

  const navigate = useNavigate();
  let page = Number(useParams().pageNumber);
  if (!page)
    page = 1;
  let pages = 4;

  let ordersList = [];
  let stringFilter = "";
  if (orders) {
    //Filter By Paid Status
    ordersList = orders;
    stringFilter = paidStatus + orderStatus;
    // console.log("filter: ", stringFilter);

    switch(stringFilter) {
      case ('isPaid'):
        ordersList = ordersList.filter((orderItem) => orderItem.isPaid);
        break;
      case 'notPaid':
        ordersList = ordersList.filter((orderItem) => !orderItem.isPaid);
        break;
      case 'notConfimred':
        ordersList = ordersList.filter((orderItem) => !orderItem.isConfirmed);
        break;
      case 'delivering':
        ordersList = ordersList.filter((orderItem) => orderItem.isConfirmed && !orderItem.isDelivered);
        break;
      case 'isDelivered':
        ordersList = ordersList.filter((orderItem) => orderItem.isDelivered);
        break;
      case 'isPaidnotConfimred':
        ordersList = ordersList.filter((orderItem) => orderItem.isPaid && !orderItem.isConfirmed);
        break;
      case 'isPaiddelivering':
        ordersList = ordersList.filter((orderItem) => orderItem.isPaid && orderItem.isConfirmed && !orderItem.isDelivered);
        break;
      case 'isPaidisDelivered':
        ordersList = ordersList.filter((orderItem) => orderItem.isPaid && orderItem.isDelivered);
        break;
      case 'notPaidnotConfimred':
        ordersList = ordersList.filter((orderItem) => !orderItem.isPaid && !orderItem.isConfirmed);
        break;
      case 'notPaiddelivering':
        ordersList = ordersList.filter((orderItem) => !orderItem.isPaid && orderItem.isConfirmed && !orderItem.isDelivered);
        break;
      case 'notPaidisDelivered':
        ordersList = ordersList.filter((orderItem) => !orderItem.isPaid && orderItem.isDelivered);
        break;
      default:
        ordersList = ordersList;
    }

    //Sort
    switch(sortBy) {
      case 'newest':
        ordersList = ordersList.sort((a, b) => Number(moment(b.createdAt).diff(moment(a.createdAt))))
        break;
      case 'oldest':
        ordersList = ordersList.sort((a, b) => Number(moment(a.createdAt).diff(moment(b.createdAt))))
        break;
      default:
        ordersList = ordersList;
    }

    //Pagination
    if (ordersList) {
      pages = ordersList ? Math.ceil(ordersList.length / NUMBER_ORDERS_PER_PAGE) : 0;
      // console.log(" Orders Pages: ", pages);
    }
  }
  //panigation
  if (ordersList && page) {
    ordersList = ordersList.slice((page - 1) * NUMBER_ORDERS_PER_PAGE, page * NUMBER_ORDERS_PER_PAGE);
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch])

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn đặt hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3 d-flex flex-row-reverse">
            
            <div className="col-lg-3 col-6 col-md-3">
              <select 
                className="form-select"
                value={orderStatus}
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  navigate(e.target.value ? `/orders/${paidStatus + e.target.value}` : `/orders`)
                }}
              >
                <option value={""}>Trạng thái</option>
                <option value={"notConfimred"}>Chờ xác nhận</option>
                <option value={"delivering"}>Đang giao hàng</option>
                <option value={"isDelivered"}>Đã giao hàng</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
              >
                <option value={""}>Thời gian</option>
                <option value={"newest"}>Gần nhất</option>
                <option value={"oldest"}>Lâu nhất</option>
              </select>
            </div>
            <div className="col-lg-3 col-6 col-md-3">
              <select 
                className="form-select"
                value={paidStatus}
                onChange={(e) => {
                  setPaidStatus(e.target.value);
                  navigate(e.target.value ? `/orders/${e.target.value + orderStatus}` : `/orders`)
                }}
              >
                <option value={""}>Thanh toán</option>
                <option value={"isPaid"}>Đã thanh toán</option>
                <option value={"notPaid"}>Chưa thanh toán</option>
              </select>
            </div>
          </div>
          
        </header>
        
        <div className="card-body">
          
          <div className="table-responsive">
            {
              loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : 
              (
                <Orders orders={ordersList}/>
              )
            }
          </div>
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {pages > 1 && (<NewsPagination pages={pages} page={page} pathName={'orders'} filterByID={stringFilter}/>)}
              
            </ul>
          </nav>
        </div>
        
      </div>
    </section>
  );
};

export default OrderMain;
