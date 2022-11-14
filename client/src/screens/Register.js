import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useLocation, useNavigate } from "react-router";
import { register } from "../Redux/Actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";




const Register = () => {
  // window.scrollTo(0, 0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const {error, loading, success, userInfo} = userRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    navigate("/login");
  }
  return (
    <>

      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : 
         
        (
          <></>
        )}
        <form className="Login col-md-8 col-lg-4 col-11" >
          <input 
            type="text" 
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={registerHandler}>Đăng Ký</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` :"/login"}>
              Đã có tài khoản <strong>Đăng nhập</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
