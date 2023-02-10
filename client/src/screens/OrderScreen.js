import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
// import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from "@paypal/react-paypal-js"; 
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router";
import { deleteAnOrder, getOrderDetails, payOrder } from "../Redux/Actions/OrderActions"; 
import Loading from "../components/LoadingError/Loading.js";
import Message from "../components/LoadingError/Error.js";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
// import CurrencyFormat from 'react-currency-format';
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { URL } from "../Redux/URL";
import { CurrencyFormatter } from "../components/converterComponents/CurrencyFormatter";



const OrderScreen = () => {
  // window.scrollTo(0, 0);

  // const {isPending} = usePayPalScriptReducer();
  const {id} = useParams();
  // console.log(id);
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const {order, loading, error} = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {loading: loadingPay, success: successPay} = orderPay;
  if (order)
    console.log(order.paymentMethod);

  useEffect(() => {
    const addPayPalScript = async() => {
      const {data: clientId} = await axios.get(`${URL}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({type: ORDER_PAY_RESET});
      dispatch(getOrderDetails(id));

    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    
  }, [dispatch, id, order, successPay]);

  if(!loading) {
    //Caculate Price
    const addDemicals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    }

    order.itemsPrice = addDemicals(
      order.orderItems.reduce((price, item) => price + item.price*item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  }

  const goHomeHandler = () => {
    window.location.href = "/";
  }
  const navigate = useNavigate();
  const deleteOrderHandler = (id) => {
    if (window.confirm("Bạn có muốn Hủy đơn hàng ?")) {
      dispatch(deleteAnOrder(id));
      window.location.href = `/profile`;
    }
  }
  return (
    <>
      <Header />
      <div className="container" style={{"minHeight": "100vh"}}>
        {
          loading ? <Loading/> : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : 
          (
            <>
              <div className="row  order-detail">
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Khách hàng</strong>
                      </h5>
                      <p>{order.user.name}</p>
                      <p>
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                      </p>
                      <p>
                        {`SĐT: ${order.shippingAddress.phoneNumber}`}
                      </p>
                    </div>
                  </div>
                </div>
          {/* 2 */}
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-truck-moving"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Đơn hàng</strong>
                      </h5>
                      <p>Shipping: {order.shippingAddress.country}</p>
                      <p>
                        Postal Code: {order.shippingAddress.postalCode}
                      </p>
                      <p>Thanh toán: {order.paymentMethod === "Offline" ? "Trực tiếp" : "Ví điện tử / Paypal"}</p>
                      
                      {
                        order.isPaid ? (
                          <div className="bg-success p-2 col-12">
                            <p className="text-white text-center text-sm-start">
                              Đã thanh toán {moment(order.paidAt).calendar()}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-danger p-2 col-12">
                            <p className="text-white text-center text-sm-start">
                              Chưa thanh toán
                            </p>
                          </div>
                        )
                      }
                      
                    </div>
                  </div>
                </div>
          {/* 3 */}
                <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                  <div className="row">
                    <div className="col-md-4 center">
                      <div className="alert-success order-box">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>
                    <div className="col-md-8 center">
                      <h5>
                        <strong>Giao hàng tới</strong>
                      </h5>
                      <p>
                        Địa chỉ: {order.shippingAddress.address}, {order.shippingAddress.city}.
                      </p>
                      {
                        order.isConfirmed ? (order.isDelivered ? (
                          <div className="bg-success p-2 col-12">
                            <p className="text-white text-center text-sm-start">
                              Đã giao hàng vào {moment(order.deliveredAt).calendar()}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-info p-2 col-12">
                            <p className="text-white text-center text-sm-start" >
                              Đang giao hàng 
                            </p>
                          </div>
                        )) : (
                          <div className="bg-warning p-2 col-12">
                            <p className="text-white text-center text-sm-start" >
                              Chờ xử lý 
                            </p>
                          </div>
                        )
                      }
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="row order-products justify-content-between">
                <div className="col-lg-8">
                  {
                    order.orderItems.length === 0 ? (
                      <Message variant="alert-info mt-5">Your order is empty</Message>
                    ) : (
                      <>
                      {
                        order.orderItems.map((item, index) => (
                          <div className="order-product row" key={index}>
                            <div className="col-md-3 col-6 d-flex flex-column align-items-center">
                              <img src={item.image} alt={item.name} />
                              <h6 className="order-item-price">
                                <b>Giá: </b> 
                                <span style={{"fontWeight": "normal", "fontSize": "15px"}}>{ CurrencyFormatter(item.price)}</span>
                                {/* <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span style={{"fontWeight": "normal", "fontSize": "15px"}}>{value}</span>} /> */}
                              </h6>
                            </div>
                            <div className="col-md-5 col-6 d-flex align-items-center">
                              <Link to={`/products/${item.category}/${item.productId}`}>
                                <h6>{item.name}</h6>
                              </Link>
                              
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                              <h4>SỐ LƯỢNG</h4>
                              <h6>{item.qty}</h6>
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                              <h4>CHI PHÍ</h4>
                              {/* <CurrencyFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h6>{value}</h6>} /> */}
                              <h6>{CurrencyFormatter(item.qty * item.price)}</h6>
                            </div>
                          </div>
                        ))
                      }
                      </>
                    )
                  }
                  
                </div>
                {/* total */}
                <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Sản phẩm</strong>
                        </td>
                        <td>
                          {/* <CurrencyFormat value={order.itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                          {CurrencyFormatter(order.itemsPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Phí vận chuyển</strong>
                        </td>
                        <td>{order.shippingPrice === 0 ? ("Miễn phí") : `${CurrencyFormatter(order.shippingPrice)}`}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>VAT</strong>
                        </td>
                        <td>
                          {/* <CurrencyFormat value={order.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                          {CurrencyFormatter(order.taxPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mã giảm giá</strong>
                        </td>
                        <td>
                          {/* <CurrencyFormat value={order.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                          {CurrencyFormatter(order.taxPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style={{"color": "#1cb803"}}>Tổng cộng</strong>
                        </td>
                        <td>
                          {/* <CurrencyFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                          {CurrencyFormatter(order.totalPrice)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <PayPalButtons amount={order.totalPrice} onSuccess={successPaymentHandler} /> */}
                  {
                    (!order.isPaid && order.paymentMethod === "Paypal") && (
                      <div className="col-12">
                        {
                          loadingPay && (<Loading/>)
                        }
                        {
                          !sdkReady ? (
                            <Loading/>
                          ) : (
                              <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                          )
                        }
                      </div>
                    )
                  }
                  {
                    !order.isConfirmed && (
                      <Link
                        className="btn btn-danger py-2 col-12"
                        to="#"
                        onClick={() => deleteOrderHandler(order._id)}
                        style={{
                          fontSize: "16px",
                          fontStyle: "bold",
                        }}
                      >
                        HỦY ĐƠN HÀNG
                      </Link>
                    )
                  }
                  
                  
                </div>
              </div>
            </>)
        }
         
        <div className=" alert alert-info text-center mt-3 mb-5">
          Click
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="#"
            onClick={goHomeHandler}
            style={{
              fontSize: "13px",
            }}
          >
            VỀ TRANG CHỦ 
          </Link>
          tiếp tục mua sắm
        </div>
      </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default OrderScreen;





