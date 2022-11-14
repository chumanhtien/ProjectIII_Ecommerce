import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PAYMENT_METHOD } from "../Redux/Constants/CartConstants";
import Header from "./../components/Header";
import { useNavigate } from "react-router";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
const PaymentScreen = () => {
  // window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const {shippingAddress} = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(1);

  console.log(paymentMethod);
  const submitHandler =  (e) => {
    // e.preventDefault();
    dispatch(savePaymentMethod(PAYMENT_METHOD[paymentMethod - 1].name));
  
    navigate("/placeorder");
    
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center" style={{"minHeight": "50vh"}}>
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
          {PAYMENT_METHOD.map(method => (
              <label className="radio-container" key={method.id}>
                <input 
                  className="form-check-input" 
                  type="radio" value={paymentMethod}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(method.id)}/>
                <div className="form-check-label">{method.name === "Paypal" ? "PayPal / Ví điện tử" : "Trực tiếp"}</div>
              </label>
             ) )}
          </div>
          

          <button type="submit" onClick={submitHandler}>
            <Link to="#" className="text-white" >
              Tiếp tục
            </Link>
          </button>
        </form>
      </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default PaymentScreen;
