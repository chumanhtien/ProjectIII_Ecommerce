import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const [link, setLink] = useState("");
  // console.log(link);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  }


  const submitHandler = () => {
    let href = "";
    if (link) {
      switch (link) {
        case "Thống kê":
          href="/";
          break;
        case "Sản phẩm":
          href="/products";
          break;
        case "Thêm sản phẩm": 
          href="/addproduct";
          break;
        case "Categories": 
          href="/category";
          break;
        case "Đơn đặt hàng": 
          href="/orders";
          break;
        case "Người dùng": 
          href="/users";
          break;
        default:
          href="/";
      };
      navigate(`${href}`);
    }
  
  }

  return (
    

 
    <header className="main-header navbar">
          
      <div className="col-search">
        <form className="searchform" onSubmit={submitHandler}>
          <div className="input-group"
            onChange={(e) => setLink(e.target.value)}>
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              {/* <i className="far fa-search"></i> */}
              <FontAwesomeIcon className="icon" icon={solid('search')} />
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Thống kê" />
            <option value="Sản phẩm" />
            <option value="Thêm sản phẩm" />
            <option value="Đơn đặt hàng" />
            <option value="Khách hàng" />
            <option value="Tin tức" />
            <option value="Nhân viên" />
            <option value="Mã giảm giá" />
            <option value="Categories" />
            
            <option value="Transaction" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          {/* <i className="md-28 fas fa-bars"></i> */}
          <FontAwesomeIcon icon={solid('bars')} />
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              {/* <i className="fas fa-moon"></i> */}
              <FontAwesomeIcon icon={solid('moon')} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              {/* <i className="fas fa-bell"></i> */}
              <FontAwesomeIcon icon={solid('bell')} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/favicon.png"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/admin/profile">
                Thông tin cá nhân
              </Link>
              {/* <Link className="dropdown-item" to="#">
                Cài đặt
              </Link> */}
              <Link onClick={logoutHandler} className="dropdown-item text-danger" to="#">
                Đăng xuất
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
