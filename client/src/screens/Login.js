import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useLocation, useNavigate } from "react-router";
import { login } from "../Redux/Actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { USER_REGISTER_RESET } from "../Redux/Constants/UserConstants";
import Toast from "../components/LoadingError/Toast";
import {toast} from 'react-toastify';


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};


const Login = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const {error,loading, userInfo} = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {success} = userRegister;

  useEffect(() => {
    if (success) {
      toast.success("Đăng ký tài khoản thành công. Mời bạn Đăng nhập", ToastObjects);
      dispatch({type: USER_REGISTER_RESET});
    }
  }, [dispatch, success]);
  

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }

  }, [userInfo, redirect, navigate]);
   
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

  }
  return (
    <>
      <Header />
      <Toast/>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant={"alert-danger"}>{error}</Message> }
        {loading && <Loading></Loading>}
        <form 
          className="Login col-md-8 col-lg-4 col-11" 
          onSubmit={submitHandler}
        >
          <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" />
          <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" />
          <button type="submit">Đăng Nhập</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` :"/register"}>Tạo tại khoản mới <strong>Đăng ký</strong></Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
