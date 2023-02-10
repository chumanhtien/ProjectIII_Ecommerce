import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, markConfirmedOrder, markDeliveredOrder } from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { toast } from "react-toastify";
import { ORDER_MARK_CONFIRMED_RESET, ORDER_MARK_DELIVERED_RESET } from "../../Redux/Constants/OrderConstants";
import Toast from "../LoadingError/Toast";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const OrderDetailMain = (props) => {
  const {orderId} = props;
  // console.log("OrderID: ", orderId);
  const dispatch = useDispatch();
  const orderSingleDetails = useSelector((state) => state.orderSingleDetails);
  const {loading, error, order} = orderSingleDetails;

  const orderMarkDelivered = useSelector((state) => state.orderMarkDelivered);
  const {loading: loadingDelivered, error: errorDelivered, success: successDelivered} = orderMarkDelivered;

  const orderMarkConfirmed = useSelector((state) => state.orderMarkConfirmed);
  const {loading: loadingConfirmed, error: errorConfirmed, success: successConfirmed} = orderMarkConfirmed;
  
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (successConfirmed) {
      toast.success("Xác nhận Đơn hàng thành công!", ToastObjects);
      dispatch({type: ORDER_MARK_CONFIRMED_RESET})
    }
    if (successDelivered) {
      toast.success("Đánh dấu Đã giao đơn hàng thành công!", ToastObjects);
      dispatch({type: ORDER_MARK_DELIVERED_RESET})
    }
  }, [dispatch, orderId, successDelivered, successConfirmed]);

  const deliveredHandler = () => {
    dispatch(markDeliveredOrder(orderId));
  }

  const confirmedHandler = () => {
    dispatch(markConfirmedOrder(orderId));
  }
  return (
    <>
      <Toast/>
      <section className="content-main">
        <div className="content-header">
          <Link to="/orders" className="btn btn-dark text-white">
            Quay trở lại trang Đơn hàng
          </Link>
        </div>
        {
          loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : 
          (
            <>
              <div className="card">
                  <header className="card-header p-3 Header-green">
                    <div className="row align-items-center ">
                      <div className="col-lg-6 col-md-6">
                        <span>
                          <i className="far fa-calendar-alt mx-2"></i>
                          <b className="text-white">
                            {moment(order.createdAt).format("llll")}
                          </b>
                        </span>
                        <br />
                        <small className="text-white mx-3 ">
                          ID đơn hàng: {order._id}
                        </small>
                      </div>
                      <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                        <input
                          type={"text"}
                          className="form-select d-inline-block"
                          style={{ maxWidth: "200px" }}
                          disabled
                          value={order.isDelivered ? "Đã giao" : order.isConfirmed ? "Đang giao hàng" : "Chờ xác nhận"}
                        >
                        </input>
                        <Link className="btn btn-success ms-2" to="#">
                          <i className="fas fa-print"></i>
                        </Link>
                      </div> 
                    </div>
                  </header>
                <div className="card-body">
              {/* Order info */}
                  <OrderDetailInfo order={order}/>
                  <div className="row">
                    <div className="col-lg-9">
                    {errorConfirmed && <Message variant={"alert-danger"}>{errorConfirmed}</Message>}
                    {errorDelivered && <Message variant={"alert-danger"}>{errorDelivered}</Message>}
                      <div className="table-responsive">
                        <OrderDetailProducts order={order} loading={loading}/>
                      </div>
                    </div>
                    
                    {/* Payment Info */}
                    <div className="col-lg-3">
                      <div className="box shadow-sm bg-light">                
                        {
                          order.isConfirmed ? (
                            <button className="btn btn-warning col-12">
                              {order.isDelivered ? `ĐÃ XÁC NHẬN` : `ĐÃ XÁC NHẬN, ĐANG GIAO`}
                            </button>
                          ) : (
                            <>
                              {loadingConfirmed && <Loading/>} 
                              <button
                                onClick={confirmedHandler} 
                                className="btn btn-danger col-12">
                                XÁC NHẬN 
                              </button>
                            </>
                            
                          )
                        }               
                      </div>
                      <div className="box shadow-sm bg-light">             
                        {
                          order.isDelivered ? (
                            <button className="btn btn-success col-12">
                              ĐÃ GIAO: ({" "} {moment(order.deliveredAt).format("llll")})
                            </button>
                          ) : (
                            <>
                              {loadingDelivered && <Loading/>} 
                              <button
                                onClick={deliveredHandler} 
                                className="btn btn-primary col-12">
                                <span>ĐÁNH DẤU ĐÃ GIAO</span>
                              </button>
                            </>
                            
                          )
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
        
      </section>
    </>
  );
};

export default OrderDetailMain;
