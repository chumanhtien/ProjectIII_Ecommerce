import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAProduct } from "../../Redux/Actions/ProductActions"
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";
const Product = (props) => {
  const { product } = props;

  const dispatch = useDispatch();
  const deleteHandler = (category, id) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này?")) {
      dispatch(deleteAProduct(category, id));
    }
  }
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-4 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to={`/products/${product.category}/${product._id}`}
            className="img-wrap">
            <img src={product.image} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to={`/products/${product.category}/${product._id}`} 
              className="title text-truncate" title={product.name}>
              {product.name}
            </Link>
            <div className="price mb-2">
              {/* <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <>{value}</>} /> */}
              {CurrencyFormatter(product.price*1000)}
            </div>
            <div className="row d-flex justify-content-evenly">
              <Link
                to={`/products/${product.category}/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-5"
              >
                <FontAwesomeIcon className="icon" icon={solid('pen')} />
              </Link>
              <Link
                to="#"
                onClick={() => deleteHandler(product.category, product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-5"
              >
                <FontAwesomeIcon className="icon" icon={solid('trash')} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
