import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartActions.js";
// import CurrencyFormat from 'react-currency-format';
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { CurrencyFormatter } from "../components/converterComponents/CurrencyFormatter";

const CartScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const {id} = useParams();
  // console.log(id);
  const search = window.location.search ? window.location.search.split("?") : [];
  console.log(search);
  const qtyString = search ? search[1] : '';
  const qty = qtyString ? Number (qtyString.split("=")[1]) : '';
  console.log("qty: ", qty);
  const category = search[2] ? search[2].split("=")[1] : '';
  console.log("category: ", category);
  const type_size = search[3] ? search[3].split("=")[1] ? search[3].split("=")[1] === 'NULL' ? '' : search[3].split("=")[1] : '' : '';
  console.log("type_size: ", type_size);
  const type_color = search[4] ? search[4].split("=")[1] ? search[4].split("=")[1] === 'NULL' ? '' : search[4].split("=")[1] : '' : '';
  console.log("type_color: ", type_color);

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  // console.log(cart);
  const navigate = useNavigate();

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(category, id, qty, {size: type_size, color: type_color}));
    }
  }, [dispatch, id]);

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }
  return (
    <>
      <Header />
      {/* Cart */}
      
      <div className="container" style={{"minHeight": "100vh"}}>
      {
        cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng rỗng
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              MUA SẮM NÀO
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Sản phẩm
              <Link className="text-success mx-2" to="/cart">
                {`(${cartItems.length})`}
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item, index) => (
              <div className="cart-item row" key={index}>
                <div className="remove-button d-flex justify-content-center align-items-center"
                     onClick = {() => removeFromCartHandler(item.productId)}>
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3 d-flex flex-column align-items-center">
                  <img src={item.image} alt={item.name} />
                  <span className="cart-price">{`Giá: `}
                    {/* <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span style={{"font-weight": "normal", "font-size": "16px"}}>{value}</span>} /> */}
                    <span style={{"font-weight": "normal", "font-size": "16px"}}>{CurrencyFormatter(item.price)}</span>
                  </span>
                  
                </div>

                <div className="cart-text col-md-5 d-flex ">
                  <Link to={`/products/${item.category}/${item.productId}`}>
                    <h4>{item.name}</h4>
                  </Link>
                  {item.types ? item.types.size ? (<h6><b>Size:</b> {item.types.size}</h6>) : <></> : <></>}
                  {item.types ? item.types.color ? <h6><b>Màu sắc:</b> {item.types.color}</h6> : <></> : <></>}

                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-1 mt-3 d-flex flex-column justify-content-start">
                  <h6>Số lượng</h6>
                  <select value = {item.qty} onChange={(e) => {
                    if (item.category === 'shoes') {
                      // navigate(`/cart/${id}?qty=${qty}?category=${category}?type_size=${shoeSize}?type_color=NULL`);
                      navigate(`/cart/${item.productId}/?qty=${e.target.value}?category=${item.category}?type_size=${item.types.size}?type_color=NULL`);// Thay ca thong tin tren duong dan
                    }
                    else {
                      navigate(`/cart/${item.productId}/?qty=${e.target.value}?category=${item.category}?type_size=NULL?type_color=NULL`);// Thay ca thong tin tren duong dan
                    }
                      dispatch(addToCart(item.category, item.productId, Number (e.target.value), {size: item.types.size, color: item.types.color})); 
                    }}>
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-4 mt-md-1 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-start col-sm-7">
                  <h6>Tổng</h6>
                  {/* <CurrencyFormat value={item.price * item.qty} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h4>{value}</h4>} /> */}
                  <h4>{CurrencyFormatter(item.price * item.qty)}</h4>
                </div>
              </div>
            ))}
            

            {/* End of cart items */}
            <div className="total">
              <span className="sub">Tổng tiền:</span>
              {/* <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span className="total-price">{value}</span>} /> */}

              <span className="total-price">{CurrencyFormatter(total)}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp tục mua sắm</button>
              </Link>
              <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
              <button onClick={checkOutHandler}>
                    {/* <Link to="/shipping" className="text-white"> */}
                      Đặt hàng
                    {/* </Link> */}
                  </button>
              </div>
            </div>
          </>
        )
      }
        
      </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default CartScreen;
