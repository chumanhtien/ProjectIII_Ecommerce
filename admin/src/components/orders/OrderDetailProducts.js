import React from "react";
// import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";

const OrderDetailProducts = (props) => {
  const {order, loading} = props;
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100 / 100).toFixed(2));
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  return (

    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Sản phẩm</th>
          <th style={{ width: "20%" }}>Giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng
          </th>
        </tr>
      </thead>
      <tbody>
        {
          order.orderItems.map((orderItem, index) => (
            <tr key={index}>
              <td>
                <Link className="itemside" to={`/products/${orderItem.category}/${orderItem.productId}`}>
                  <div className="left">
                    <img
                      src={orderItem.image}
                      alt={orderItem.name}
                      style={{ width: "40px", height: "40px" }}
                      className="img-xs"
                    />
                  </div>
                  <div className="info">
                    {orderItem.name}{" "}
                  </div>
                </Link>
              </td>

              <td>{CurrencyFormatter(orderItem.price * 1000)} </td>
              {/* <CurrencyFormat value={orderItem.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <td>{value} </td>} /> */}

              <td>{orderItem.qty} </td>
              
              <td className="text-end">{CurrencyFormatter(orderItem.price * orderItem.qty * 1000)}</td>
              {/* <CurrencyFormat value={orderItem.price * orderItem.qty} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <td className="text-end">{value}</td>} /> */}

            </tr>
          ))
        }
        

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tiền sản phẩm:</dt> 
                <dd>{CurrencyFormatter(order.itemsPrice*1000)}</dd>
                {/* <CurrencyFormat value={order.itemsPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <dd>{value}</dd>} /> */}

              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển:</dt> 
                {order.shippingPrice ? <dd>{CurrencyFormatter(order.shippingPrice*1000)}</dd> : <dd>Miễn phí</dd>}
                
              </dl>
              <dl className="dlist"> 
                <dt>VAT:</dt> <dd>{CurrencyFormatter(order.taxPrice*1000)}</dd>
              </dl>
              {order.voucherID &&
                <dl className="dlist"> 
                  <dt>Mã giảm giá:</dt> <dd><Link to={`/vouchers/${order.voucherID}/edit`}>{order.voucherID}</Link></dd>
                </dl>
              }
              <dl className="dlist"> 
                <dt>Giảm giá:</dt> <dd style={{color: 'red'}}>{CurrencyFormatter(order.discountPrice*1000)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng chi phí:</dt>
                <dd>
                  <b className="h5">{CurrencyFormatter(order.totalPrice*1000)}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Trạng thái:</dt>
                <dd>
                  {
                    order.isPaid ? (
                      <span className="badge rounded-pill alert alert-success text-success">
                        Đã thanh toán
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert alert-danger text-danger">
                        Chưa thanh toán
                      </span>
                    )
                  }
                  
                </dd>
                <dd>
                  {
                    !order.isConfirmed ? (
                      <span className="badge rounded-pill alert alert-danger text-danger">
                        Chờ xác nhận
                      </span>
                    ) : order.isDelivered ? (
                      <span className="badge rounded-pill alert alert-success text-success">
                        Đã giao hàng
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert alert-warning text-warning">
                        Đang giao hàng
                      </span>
                    )
                  }
                  
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
