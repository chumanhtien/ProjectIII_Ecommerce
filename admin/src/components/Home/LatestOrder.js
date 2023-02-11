import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const LatestOrder = (props) => {
  const {loading, error, orders} = props;

  return (
    <div className="card-body">
      <h5 className="card-title">Đơn hàng gần đây</h5>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
              orders.slice(0, 5).map((order, index) => (
                <tr key={index}>
                  <td>
                    <b>{order?.user?.name}</b>
                  </td>
                  <td>{order?.user?.email}</td>
                  <td>{CurrencyFormatter(order.totalPrice)}</td>
                  <td>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert-success">
                      Đã thanh toán {moment(order.createdAt).format("llll")}
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert-danger">
                      Chưa thanh toán
                    </span>
                  )}
                    
                  </td>
                  <td>{moment(order.createdAt).calendar()}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <FontAwesomeIcon icon={solid('eye')}/>
                      {/* <i className="fas fa-eye"></i> */}
                    </Link>
                  </td>
                </tr>
              ))
            )}
            
            {/* Not Paid */}
            {/* <tr>
              <td>
                <b>User</b>
              </td>
              <td>user@example.com</td>
              <td>$345</td>
              <td>
                <span className="badge rounded-pill alert-danger">
                  Created At Today at 10:13 AM
                </span>
              </td>
              <td>Today at 10:13 AM</td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order`} className="text-success">
                  // <i className="fas fa-eye"></i>
                  <FontAwesomeIcon className="icon" icon={solid('eye')}/> 
                </Link>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrder;
