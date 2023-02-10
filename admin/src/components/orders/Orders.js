import moment from "moment";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";
import Message from "../LoadingError/Error";

const Orders = (props) => {
  const {orders} = props;
  // console.log(orders);

  
  return (
    <table className="table">
      
      <thead>
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Email</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Thanh toán</th>
          <th scope="col">Thời gian</th>
          <th>Trạng thái</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.length === 0 && <div className="alert alert-info text-center mt-3">Danh sách Đơn đặt hàng rỗng</div>}
        {orders && orders.map((order, index) => (
          <tr key={index}>
            <td>
            <b>{order.user.name}</b>
            </td>
            <td>{order.user.email}</td>
            <td>
              {/* ${order.totalPrice} */}
              <span>{CurrencyFormatter(order.totalPrice)}</span>
              {/* <CurrencyFormat value={order.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} /> */}
            </td>
            <td>
              {
                order.isPaid ? (
                  <span className="badge rounded-pill alert-success">
                    Đã thanh toán: {moment(order.paidAt).calendar()}
                  </span>      
                ) : (
                  <span className="badge rounded-pill alert-danger">
                    Chưa thanh toán
                  </span>  
                )
              }
              
            </td>
            <td>{moment(order.createdAt).format("MMM Do YYYY")}</td>
            <td>
              {
                order.isConfirmed ? order.isDelivered ? (<span className="badge btn-success">Đã giao</span>) 
                : (<span className="badge btn-warning">Đang giao hàng</span>)
                : (<span className="badge btn-danger">Chờ xác nhận</span>)
              }
              
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
