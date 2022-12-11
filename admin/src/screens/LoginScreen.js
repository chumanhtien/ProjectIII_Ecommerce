import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../Redux/Actions/UserActions";
import Toast from "../components/LoadingError/Toast";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
   // console.log(location);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <>
    <Toast/>
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
        {error && <Message variant={"alert-danger"}>{error}</Message>}
        {loading && <Loading></Loading>}
          <h4 className="card-title mb-4 text-center">Đăng Nhập</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
