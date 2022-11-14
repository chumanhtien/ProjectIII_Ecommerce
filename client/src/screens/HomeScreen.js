import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import { useParams } from "react-router";
import { useEffect } from "react";
import Toast from "../components/LoadingError/Toast";
import {toast} from "react-toastify";
import { USER_REGISTER_RESET } from "../Redux/Constants/UserConstants";
import { useDispatch, useSelector } from "react-redux";




const HomeScreen = (props) => {
  window.scrollTo(0, 0);
  const {category} = props;
  // console.log("category: ", category);
  const {keyword} = useParams();
  // console.log("Keyword", keyword);
  const {pageNumber} = useParams();
  // const userRegister = useSelector((state) => state.userRegister);
  // const {loading, success, userInfo} = userRegister;
  
  
  return (
    <div>
      <Toast/>
      <Header category={category}/>
      <ShopSection category={category} keyword={keyword} pageNumber={pageNumber}/>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
