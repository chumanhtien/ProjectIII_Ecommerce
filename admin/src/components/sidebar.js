import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { solid, regular, sharp } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link, NavLink } from "react-router-dom";
// import 
const Sidebar = () => {
  const goHomeHandler = () => {
    window.location.href = "/"
  }
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="#" className="brand-wrap" onClick={goHomeHandler}>
            <img
              src="/images/ecommerce-logo.png"
              style={{ height: "50", width: "100" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              {/* <i className="text-muted fas fa-stream"></i> */}
              <FontAwesomeIcon className="icon text-muted" icon={solid('stream')} style={{fontSize: '20px'}} />
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <FontAwesomeIcon className="icon" icon={solid('home')} />
                {/* <i className="icon fas fa-home"></i> */}
                <span className="text">Thống kê</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <FontAwesomeIcon className="icon" icon={solid('shirt')} />
                {/* <i className="icon fas fa-shopping-bag"></i> */}
                <span className="text">Sản phẩm</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <FontAwesomeIcon className="icon" icon={solid('cart-plus')} />
                <span className="text">Thêm sản phẩm</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <FontAwesomeIcon className="icon" icon={solid('shopping-bag')} />
                <span className="text">Đơn đặt hàng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <FontAwesomeIcon className="icon" icon={solid('user')} />
                <span className="text">Khách hàng</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/news"
              >
                <FontAwesomeIcon className="icon" icon={solid('newspaper')}/>
                <span className="text">Tin tức</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/staffs"
              >
                <FontAwesomeIcon className="icon" icon={solid('users')}/>
                <span className="text">Nhân viên</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/vouchers"
              >
                <FontAwesomeIcon className="icon" icon={solid('ticket')} />
                {/* <i className="icon fas fa-list"></i> */}
                <span className="text">Mã giảm giá</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/categories"
              >
                <FontAwesomeIcon className="icon" icon={solid('list')} />
                {/* <i className="icon fas fa-list"></i> */}
                <span className="text">Categories</span>
              </NavLink>
            </li>
            

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link disabled"
                to="/transaction"
              >
                <FontAwesomeIcon className="icon" icon={solid('money-check-dollar')} />
                <span className="text">Transactions</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
