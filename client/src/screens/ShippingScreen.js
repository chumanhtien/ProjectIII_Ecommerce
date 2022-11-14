import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/CartActions";
import { useNavigate } from "react-router";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
const ShippingScreen = () => {

  const cart = useSelector((state) => state.cart);
  const shippingAddress = cart ? cart.shippingAddress : {};

  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "");
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : "");
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress ? shippingAddress.phoneNumber : "");
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country: "");
  if (!address && !city && !postalCode && !country && !phoneNumber) {
    window.scrollTo(0, 0);
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({
      address, 
      city,
      postalCode,
      phoneNumber,
      country
    }));
    navigate("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center" style={{"minHeight": "100vh"}}>
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ĐỊA CHỈ NHẬN HÀNG</h6>
          
          <input 
            type="text" 
            placeholder="Postal Code" 
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Số điện thoại" 
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Quốc gia" 
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            />
          <input 
            type="text" 
            placeholder="Thành phố / Tỉnh"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            />

          <input 
            type="text" 
            placeholder="Địa chỉ nhà"
            value={address}
            onChange={(e) => setAddress(e.target.value)} />
          <button type="submit">
            <Link to="#" className="text-white">
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

export default ShippingScreen;
