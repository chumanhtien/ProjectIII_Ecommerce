import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/Product/ProductScreen";
import CategoriesScreen from "./screens/Category/CategoriesScreen";
import OrderScreen from "./screens/Order/OrderScreen";
import OrderDetailScreen from "./screens/Order/OrderDetailScreen";
import AddProduct from "./screens/Product/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/User/UsersScreen";
import ProductEditScreen from "./screens/Product/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter  from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { getALLNews, getAllProducts } from "./Redux/Actions/ProductActions";
import SingleProduct from "./screens/Product/SingleProduct";
import { getAllOrders } from "./Redux/Actions/OrderActions";
import ProfileScreen from "./screens/User/ProfileScreen";
import EditProfileScreen from "./screens/User/EditProfileScreen";
import AddUser from "./screens/User/AddUser";
import AdminProfileScreen from "./screens/AdminProfileScreen";
import NewsScreen from "./screens/News/NewsScreen";
import AddNews from "./screens/News/AddNews";
import SingeNewsScreen from "./screens/News/SingeNewsScreen";
import { listUser } from "./Redux/Actions/UserActions";
import VoucherScreen from "./screens/Voucher/VoucherScreen";
import EditVoucherScreen from "./screens/Voucher/EditVoucherScreen";
import CreateVoucherScreen from "./screens/Voucher/CreateVoucherScreen";
function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin;

  useEffect(() => {
    if (userInfo && (userInfo.role === 1)) {
      // dispatch(getListCategories());
      dispatch(getAllOrders());
      dispatch(getAllProducts());
      dispatch(getALLNews());
      dispatch(listUser());
    }
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRouter/>}>
            <Route path="/" element={<HomeScreen/>} exact />
            <Route path="/products" element={<ProductScreen/>} />
            <Route path="/products/search/:keyword" element={<ProductScreen/>} />
            <Route path="/products/:category/search/:keyword" element={<ProductScreen/>} />
            <Route path="/products/search/:keyword/page/:pageNumber" element={<ProductScreen/>} />
            <Route path="/products/:category" element={<ProductScreen/>} />
            <Route path="/products/:category/page/:pageNumber" element={<ProductScreen/>} />
            <Route path="/products/:category/search/:keyword/page/:pageNumber" element={<ProductScreen/>} />
            <Route path="/products/page/:pageNumber" element={<ProductScreen/>} />

            <Route path="/news" element={<NewsScreen/>} />
            <Route path="/news/search/:keyword" element={<NewsScreen/>} />
            <Route path="/news/:filter/search/:keyword" element={<NewsScreen/>} />
            <Route path="/news/search/:keyword" element={<NewsScreen/>} />
            <Route path="/news/:filter/search/:keyword/page/:pageNumber" element={<NewsScreen/>} />

            <Route path="/news/page/:pageNumber" element={<NewsScreen/>} />
            <Route path="/news/:filter/page/:pageNumber" element={<NewsScreen/>} />
            <Route path="/news/:filter" element={<NewsScreen/>} />
            <Route path="/news/noibo/:id" element={<SingeNewsScreen/>} />
            <Route path="/news/singlenews" element={<SingeNewsScreen/>} />





            <Route path="/categories" element={<CategoriesScreen/>} />
            <Route path="/categories/:id/edit" element={<CategoriesScreen/>} />

            <Route path="/orders" element={<OrderScreen/>} />
            <Route path="/orders/page/:pageNumber" element={<OrderScreen/>} />
            <Route path="/orders/:filter" element={<OrderScreen/>} />
            <Route path="/orders/:filter/page/:pageNumber" element={<OrderScreen/>} />


            <Route path="/order/:id" element={<OrderDetailScreen/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/addnews" element={<AddNews/>} />


            <Route path="/users" element={<UsersScreen/>} />
            <Route path="/users/page/:pageNumber" element={<UsersScreen/>} />
            <Route path="/users/search/:keyword/page/:pageNumber" element={<UsersScreen/>} />
            <Route path="/users/search/:keyword" element={<UsersScreen/>} />


            <Route path="/admin/profile" element={<AdminProfileScreen/>}/>
            <Route path="/users/:id/profile" element={<ProfileScreen/>} />
            <Route path="/users/:id/editprofile" element={<EditProfileScreen/>} />
            <Route path="/users/add" element={<AddUser/>} />


            <Route path="/users/:id/profile" element={<ProfileScreen/>} />
            <Route path="/users/:id/editprofile" element={<EditProfileScreen/>} />

            <Route path="/vouchers" element={<VoucherScreen />}></Route>
            <Route path="/vouchers/add" element={<CreateVoucherScreen />}></Route>
            <Route path="/vouchers/:id/edit" element={<EditVoucherScreen />}></Route>
            <Route path="/vouchers/page/:pageNumber" element={<VoucherScreen/>} />
            <Route path="/vouchers/:filter/page/:pageNumber" element={<VoucherScreen/>} />
            <Route path="/vouchers/:filter" element={<VoucherScreen />} />
            <Route path="/vouchers/search/:keyword" element={<VoucherScreen/>} />
            <Route path="/vouchers/:filter/search/:keyword" element={<VoucherScreen/>} />
            <Route path="/vouchers/search/:keyword" element={<VoucherScreen/>} />
            <Route path="/vouchers/:filter/search/:keyword/page/:pageNumber" element={<VoucherScreen/>} />
            {/* <Route path="/products/shoes/:id/edit" element={<ProductEditScreen/>} /> */}
            <Route path="/products/:category/:id/edit" element={<ProductEditScreen/>} />
            <Route path="/products/:category/:id" element={<SingleProduct/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound/>} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;