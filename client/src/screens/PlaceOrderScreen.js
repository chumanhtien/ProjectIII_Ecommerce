import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { PAYMENT_METHOD } from "../Redux/Constants/CartConstants";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import { useNavigate } from "react-router";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderActions";
// import CurrencyFormat from 'react-currency-format';
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { CurrencyFormatter } from "../components/converterComponents/CurrencyFormatter";
import AddVoucherModal from "../components/modals/AddVoucherModal";


const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);

  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  if (cart)
    console.log(cart.paymentMethod);

  const orderCreate = useSelector((state) => state.orderCreate);
  const {order, success, error} = orderCreate;

  if (order)
    console.log("Payment method", order.paymentMethod, " Cart: ", cart.paymentMethod);
  const navigate = useNavigate();

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
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      // window.location.href = `/order/${order._id}`;
      dispatch({type: ORDER_CREATE_RESET});
    }

  }, [navigate, dispatch, success, order]);


  const addDemicals = (num) => {
    return (Math.round(num * 100)/ 100).toFixed(2);
  }

  //Caculate Price
  cart.itemsPrice = addDemicals(
    cart.cartItems.reduce((price, item) => price + item.price*item.qty, 0)
  );

  //Shipping price: itemPrice >= $500 or number of shoes >= 3 => cost = 0 else cost = 6$
  cart.shippingPrice = ((cart.cartItems.length >= 3 || cart.itemsPrice >= 500) ? 0 : 5);
  
  // Tax: 6.6%
  cart.taxPrice = addDemicals(Number(0.066 * cart.itemsPrice));
    //total
  cart.totalPrice = addDemicals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));
  
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
  };

  return (
    <>
      <Header />
      <div className="container" style={{"minHeight": "100vh"}}>
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{userInfo.name}</p>
                {/* <p>{userInfo.email}</p> */}
                <p>
                  <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                </p>
                <p>
                  {`SĐT: ${cart.shippingAddress.phoneNumber}`}
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
                  <strong>Thông tin đơn hàng</strong>
                </h5>
                <p>Quốc gia: {cart.shippingAddress.country}</p>
                <p>
                  Postal Code: {cart.shippingAddress.postalCode}
                </p>
                <p>Thanh toán: {cart.paymentMethod === "Paypal" ?  "PayPal / Ví điện tử" : "Trực tiếp"}</p>
                
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
                  Địa chỉ: {cart.shippingAddress.address}, {cart.shippingAddress.city}.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {
              cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                <>
                  {
                    cart.cartItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6 d-flex flex-column align-items-center">
                          <img src={item.image} alt={item.name} />
                          <h6 className="order-item-price">
                            <b>Giá: </b> 
                            {/* <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span style={{"fontWeight": "normal", "fontSize": "15px"}}>{value}</span>} /> */}
                            <span style={{"fontWeight": "normal", "fontSize": "15px"}}>{CurrencyFormatter(item.price)}</span>
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
                          {/* <CurrencyFormat value={item.qty * item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h6>{value}</h6>} /> */}
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
          <div className="col-lg-4 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td width={"45%"}>
                    <strong>Sản phẩm</strong>
                  </td>
                  <td>
                  {/* <CurrencyFormat value={cart.itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                    {CurrencyFormatter(cart.itemsPrice)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí vận chuyển</strong>
                  </td>
                  <td>{cart.shippingPrice === 0 ? ("Miễn phí") : `${CurrencyFormatter(cart.shippingPrice)}`}</td>
                </tr>
                <tr>
                  <td>
                    <strong>VAT: </strong>
                  </td>
                  <td>
                    {CurrencyFormatter(cart.taxPrice)}
                    {/* <CurrencyFormat value={cart.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Mã Giảm giá: </strong>
                  </td>
                  <td style={{"color": "red"}}>
                    {CurrencyFormatter(-100000000)}
                    {/* <CurrencyFormat value={cart.taxPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style={{"color": "#1cb803"}}>Tổng cộng</strong>
                  </td>
                  <td >
                    {CurrencyFormatter(cart.totalPrice)}
                    {/* <CurrencyFormat value={cart.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <b>{value}</b>} /> */}
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="button" className="btn-add-voucher" onClick={() => setShowModal(true)}>
              <b>Thêm mã giảm giá</b>
            </button>
            {
              cart.cartItems.length === 0 ? null : (
                <button className="" type="submit" onClick={placeOrderHandler}>
                  <b>ĐẶT HÀNG</b>
                </button>
              )
            }
            {
              error && (
                <div className="my-3 col-12">
                  <Message variant="alert-danger">{error}</Message>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
      {showModal && <AddVoucherModal showModal={showModal} setShowModal={setShowModal} listVoucher={ voucherItems} />}
    </>
    
  );
};

export default PlaceOrderScreen;
