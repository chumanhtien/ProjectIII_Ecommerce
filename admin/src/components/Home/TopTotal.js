import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CurrencyFormat from 'react-currency-format';
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";

const TopTotal = (props) => {
  const {orders, products, news, users} = props;
  let totalSales = 0;
  const addDecimals = (num) => {
    return (Math.round(num * 100 / 100).toFixed(2));
  }
  if (orders) {
    orders.map((order) => {
      order.isPaid ? (totalSales = totalSales + order.totalPrice) : (totalSales = totalSales);
    });
    totalSales = addDecimals(totalSales);
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <FontAwesomeIcon className="text-primary" icon={solid('sack-dollar')} />
            </span>
            <div className="text">
              <h6 className="mb-1">Doanh thu</h6> 
              {/* <CurrencyFormat value={totalSales} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} /> */}
              <span>{CurrencyFormatter(totalSales*1000)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <FontAwesomeIcon className="text-success" icon={solid('basket-shopping')} />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng đơn hàng</h6>
              <span>{orders && orders.length}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <FontAwesomeIcon className="text-warning" icon={solid('gifts')} />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số sản phẩm</h6>
              <span>{products ? products.length : 0}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-danger">
              <FontAwesomeIcon className="text-danger" icon={solid('user')} />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số Người dùng</h6>
              <span>{users ? users.length : 0}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-info">
              <FontAwesomeIcon className="text-info" icon={solid('newspaper')} />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số Tin tức</h6>
              <span>{news ? news.length : 0}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
