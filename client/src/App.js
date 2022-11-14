import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter.js";
import { getListCategories } from "./Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";
import NewsScreen from "./screens/NewsScreen";
import SingleNew from "./screens/SingleNew";
import { CurrrencyFormatter } from "./components/converterComponents/CurrencyFormatter";

const App = () => {
  // console.log("URL: ", process.env);
  // console.log(CurrrencyFormatter(10000));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCategories());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomeScreen/>} exact />
      <Route path="/search/:keyword" element={<HomeScreen/>} exact />
      <Route 
        path="/search/:keyword/page/:pageNumber" 
        element={<HomeScreen/>} 
        exact 
      />
      <Route 
        path="/:category/search/:keyword" 
        element={<HomeScreen/>} 
        exact 
      />
      <Route 
        path="/news/search/:keyword" 
        element={<NewsScreen/>} 
        exact 
      />
      <Route 
        path="/:category/search/:keyword/page/:pageNumber" 
        element={<HomeScreen/>} 
        exact 
      />
      <Route 
        path="/news/search/:keyword/page/:pageNumber" 
        element={<NewsScreen/>} 
        exact 
      />

      <Route path="/page/:pageNumber" element={<HomeScreen/> } 
        exact 
      />
      <Route path="/shoes/page/:pageNumber" element={<HomeScreen category='shoes'/> } 
        exact 
      />
      <Route path="/mobiles/page/:pageNumber" element={<HomeScreen category='mobiles'/> } 
        exact 
      />
      <Route path="/manclothes/page/:pageNumber" element={<HomeScreen category='manclothes'/> } 
        exact 
      />
      <Route path="/toys/page/:pageNumber" element={<HomeScreen category='toys'/> } 
        exact 
      />
      <Route path="/babymom/page/:pageNumber" element={<HomeScreen category='babymom'/> } 
        exact 
      />
      <Route path="/news/page/:pageNumber" element={<NewsScreen category='news'/> } 
        exact 
      />
      <Route path="/news/:filter/page/:pageNumber" element={<NewsScreen category='news'/> } 
        exact 
      />
  
  
      <Route path="/mobiles" element={<HomeScreen category={"mobiles"}/>} />
      <Route path="/shoes" element={<HomeScreen category={"shoes"}/>} />
      <Route path="/manclothes" element={<HomeScreen category={"manclothes"}/>} />
      <Route path="/toys" element={<HomeScreen category={"toys"}/>} />
      <Route path="/babymom" element={<HomeScreen category={"babymom"}/>} />
      <Route path="/news" element={<NewsScreen category={"news"}/>} />
      <Route path="/news/:filter" element={<NewsScreen category={"news"}/>} />



      {/* <Route path="/products/:category/:id" element={<SingleProduct/>} /> */}
      <Route path="/products/mobiles/:id" element={<SingleProduct category={"mobiles"}/>} />
      <Route path="/products/shoes/:id" element={<SingleProduct category={"shoes"}/>} />
      <Route path="/products/manclothes/:id" element={<SingleProduct category={"manclothes"}/>} />
      <Route path="/products/toys/:id" element={<SingleProduct category={"toys"}/>} />
      <Route path="/products/babymom/:id" element={<SingleProduct category={"babymom"}/>} />

      <Route path="/singlenew" element={<SingleNew/>} />
      <Route path="/news/noibo/:id" element={<SingleNew/>} />




      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
        
        {/* Private Route */}
        <Route element={<PrivateRouter/>}>
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/cart/:id" element={<CartScreen/>} />
          <Route path="/cart" element={<CartScreen/>} />
          <Route path="/shipping" element={<ShippingScreen/>} />
          <Route path="/payment" element={<PaymentScreen/>} />
          <Route path="/placeorder" element={<PlaceOrderScreen/>} />
          <Route path="/order" element={<OrderScreen/>} />
          <Route path="/order/:id" element={<OrderScreen/>} />
        </Route>
          
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default App;
