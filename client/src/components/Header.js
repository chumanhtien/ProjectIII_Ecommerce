import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/Actions/UserActions";
import {useNavigate} from "react-router"
import { getAllProducts, getListCategories } from "../Redux/Actions/ProductActions";
import Loading from "./LoadingError/Loading";
import Message from "./LoadingError/Error";
import { saveCartStateFromDB } from "../Redux/Actions/CartActions";

const Header = () => {

  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

  const productListCategories = useSelector((state) => state.productListCategories);
  const {loading, error, categories} = productListCategories;

  // console.log(categories ? categories : "NO");

  const logoutHandler = () => {
    dispatch(logout());
  }
  const goHomeHandler = () => {
    window.location.href = "/";
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch(getAllProducts(keyword))
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  }

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(saveCartStateFromDB(userInfo._id))
    }
  }, [])
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>0979 832 446</p>
              <p>tiencm194182@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link to="#" className="navbar-brand" onClick={goHomeHandler}>
                    <img alt="logo" src="/images/ecommerce-logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo ? (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                        <i class="fas fa-user"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Thông tin
                          </Link>

                          <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                            Đăng xuất
                          </Link>
                        </div>
                      </div>

                    ) : (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                        <i class="fas fa-user"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/login">
                            Đăng nhập
                          </Link>

                          <Link className="dropdown-item" to="/register">
                            Đăng ký
                          </Link>
                        </div>
                      </div>
                    )
                  }
                  
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{userInfo && cartItems.length}</span>
                  </Link>
                </div>
                
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm sản phẩm"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
                
                <div className="row header_main">
                    <div className="col-md-2 col-4 d-flex align-items-center">
                      <Link to="/news">
                        <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                        Tin tức
                      </Link>
                    </div>
                      
                  {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
                    categories.map((categoryItem, index) => (
                      <div className="col-md-2 col-4 d-flex align-items-center" key={index}>
                        <Link to={`/${categoryItem.name}`}>
                          <i className={categoryItem.iconImage} style={{"margin-right":"10px"}}></i>
                          {categoryItem.mapName}
                        </Link>
                      </div>
                    ))
                  )}
                  
                  {/* <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/mobiles">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      ĐTDĐ
                    </Link>
                  </div>
                  <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      Đồ chơi
                    </Link>
                  </div>
                  <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/shoes">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      Giày Dép
                    </Link>
                  </div>
                  <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      Quần áo Nam
                    </Link>
                  </div>
                  <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      Quần áo Nữ
                    </Link>
                  </div>
                  <div className="col-md-2 col-4 d-flex align-items-center">
                    <Link to="/">
                      <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                      Đồ chơi
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row header_top">
              <div className="col-md-3 col-4 d-flex align-items-center" style={{"width":"18%"}}>
                <Link to="#" className="navbar-brand" onClick={goHomeHandler}>
                  <img alt="logo" src="/images/ecommerce-logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit = {submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {
                  userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                      <i class="fas fa-user" style={{"margin-right": "4px"}}></i>
                      {userInfo.name}
                      
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Thông tin cá nhân
                        </Link>

                        <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  ) : (    
                    <>
                      <Link className="dropdown-item" to="/login">
                        Đăng nhập
                      </Link>

                      <Link className="dropdown-item" to="/register">
                        Đăng ký
                      </Link>
                    </>
                  )
                }
                

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{userInfo && cartItems.length}</span>
                </Link>
              </div>
            </div>
            <div className="row header_main">
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/news">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  Tin tức
                </Link>
              </div>
              {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
                categories.map((categoryItem, index) => (
                  <div className="col-md-2 col-4 d-flex align-items-center" key={index}>
                    <Link to={`/${categoryItem.name}`}>
                      <i className={categoryItem.iconImage} style={{"margin-right":"10px"}}></i>
                      {categoryItem.mapName}
                    </Link>
                  </div>
                ))
              )}
              {/* <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/mobiles">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  DTDĐ
                </Link>
              </div>
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/shoes">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  Giày dép
                </Link>
              </div>
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/manclothes">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  Quần áo Nam
                </Link>
              </div>
              
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/toys">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  Đồ chơi
                </Link>
              </div>
              <div className="col-md-2 col-4 d-flex align-items-center">
                <Link to="/babymom">
                  <i className="fas fa-shopping-bag" style={{"margin-right":"10px"}}></i>
                  Mẹ và bé
                </Link>
              </div> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
