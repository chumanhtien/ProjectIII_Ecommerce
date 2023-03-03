import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import Rating from "../../components/products/Rating";
import Message from '../../components/LoadingError/Error';
// import dtddProducts from "../data/dtddProducts";
// import shoesProducts from "../../data/Products/shoesProducts"
import Sidebar from "../../components/sidebar";
import Loading from "../../components/LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDetails } from "../../Redux/Actions/ProductActions";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { CurrencyFormatter } from "../../components/converterComponents/CurrencyFormatter";


const SingleProduct = () => {
  // const product = products.find((p) => p._id === match.params.id);
  const {category, id} = useParams();
  console.log(category, id);
  const dispatch = useDispatch();
  const productSingleDetails = useSelector((state) => state.productSingleDetails);
  const {loading, error, product} = productSingleDetails;

//   const products = shoesProducts;
//   // const products = dtddProducts;
//   const product = products[1];
  if (product) {
    console.log(product);
  }
  useEffect(() => {
    
    dispatch(getSingleDetails(category, id));
      
  }, [dispatch, category, id, product.name, product.countInStock, product.price]);


  return (
      <>
        <Sidebar />
        <main className="main-wrap">
          <Header />
          <section className="content-main">
            <div className="content-header d-flex flex-column align-items-start">
                <Link to="/products" className="btn btn-danger text-white mb-2">
                  Trở lại trang Sản phẩm
                </Link>
                <h2 className="content-title">Thông tin sản phẩm</h2>
            </div>
            {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> :
            (
              <div className="container single-product">
                <div className="row">
                  <div className="col-md-6">
                      <div className="single-image">
                          <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-dtl-number col-lg-10 ">
                          <div className="flex-box d-flex justify-content-between align-items-center">
                          <h5>Giá</h5>
                          {/* <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} /> */}

                          <span>{CurrencyFormatter(product.price*1000)}</span>
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                          <h5>Trạng thái</h5>
                          {product.countInStock > 0 ? (
                              <span>Còn hàng</span>
                          ) : (
                              <span>Hết hàng</span>
                          )}
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                          <h5>Đánh giá</h5>
                          <Rating 
                              value={product.rating}
                              text={` ${product.numReviews} reviews`}
                          />
                          </div>
                          {product.countInStock > 0 ? (
                          <>
                              <div className="flex-box d-flex justify-content-between align-items-center">
                              <h5>Số lượng</h5>
                                  <span>{product.countInStock}</span>
                              </div>
                              
                          </>
                          ) : null}
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="product-dtl">
                      <div className="product-info">
                          <div className="product-name">{product.name}</div>
                      </div>
                      
                      <p className="product-new-line">{product.description}</p>
                      <div>
                          <br></br>
                          {/* MOBILES */}
                          {product.category === "mobiles" ? (<>
                              <div className="product-name">Thông số kỹ thuật</div>
                              <table>
                              <tr>
                                  <td>Màn hình: <span className="product-info-detail">{product.productInfoDetail.screen}</span></td>
                              </tr>
                              <tr>
                                  <td>Hệ điều hành: <span className="product-info-detail">{product.productInfoDetail.os}</span></td>
                              </tr>
                              <tr>
                                  <td>Camera sau: <span className="product-info-detail">{product.productInfoDetail.camera_back}</span></td>
                                  
                              </tr>
                              <tr>
                                  <td>Camera trước: <span className="product-info-detail">{product.productInfoDetail.camera_front}</span> </td>
                                  
                              </tr>
                              <tr>
                                  <td>Chip: <span className="product-info-detail">{product.productInfoDetail.chip}</span></td>
                                  
                              </tr>
                              <tr>
                                  <td>RAM: <span className="product-info-detail">{product.productInfoDetail.RAM}GB</span></td>
                                  
                              </tr>
                              <tr>
                                  <td>Bộ nhớ trong: <span className="product-info-detail">{product.productInfoDetail.ROM}GB</span></td>
                                  
                              </tr>
                              <tr>
                                  <td>Sim: <span className="product-info-detail">{product.productInfoDetail.SIM}</span></td>
                                  
                              </tr>
                              <tr>
                                  <td>Pin, sạc: <span className="product-info-detail">{product.productInfoDetail.pin_charge} mAH</span></td>
                                  
                              </tr>
                              </table>
                          </>): (<></>)}
                          
                          {/* SHOES */}
                          {product.category === "shoes" ? (<>
                              <div className="product-name">Thông tin sản phẩm</div>
                              <table>
                              <tr>
                                  <td>Thương hiệu: <span className="product-info-detail">{product.productInfoDetail.brand}</span></td>      
                              </tr>
                              <tr>
                                  <td>Xuất xứ: <span className="product-info-detail">{product.productInfoDetail.origin}</span></td>
                              </tr>
                              <tr>
                                  <td>Chất liệu: <span className="product-info-detail">{product.productInfoDetail.material}</span></td>
                              </tr>
                              <tr>
                                  <td>Size: <span className="product-info-detail">{product.productInfoDetail.sizes.map((x, index) => (index < product.productInfoDetail.sizes.length - 1) ? (x + " - ") : x)}</span></td>      
                              </tr>
                              
                              
                              </table>
                          </>) : <></>}

                          {/* MANCLOTHES */}
                        {product.category === "manclothes" ? (<>
                          <div className="product-name">Thông tin sản phẩm</div>
                          <table>
                            <tr>
                              <td>Thương hiệu: <span className="product-info-detail">{product.productInfoDetail.brand}</span></td>
                            </tr>
                            <tr>
                              <td>Xuất xứ: <span className="product-info-detail">{product.productInfoDetail.origin}</span></td>
                            </tr>
                            <tr>
                              <td>Chất liệu: <span className="product-info-detail">{product.productInfoDetail.material}</span></td>
                            </tr>
                            <tr>
                              <td>Size: <span className="product-info-detail">{product.productInfoDetail.sizes.map((x, index) => (index < product.productInfoDetail.sizes.length - 1) ? (x + " - ") : x)}</span></td>      
                            </tr>
                            <tr>
                              <td>{`Màu sắc: `} 
                                <span className="product-info-detail">{
                                  `${product.productInfoDetail.colors.length} màu: `}
                                  {product.productInfoDetail.colors.map((x, index) => (
                                  <span key={index}>{index < product.productInfoDetail.colors.length - 1 ? `${x} | ` : `${x}` }</span>))}
                                </span>
                                <br />
                              {/* <ul className="product-info-detail">
                                {product.productInfoDetail.colors.map((x, index) => (
                                <li key={index}>{x}</li>))}
                              </ul>  */}
                              </td>
                              
                            </tr>
                          </table>
                        </>) : <></>}
                        
                        {/* TOYS */}
                        {product.category === "toys" ? (<>
                          <div className="product-name">Thông tin sản phẩm</div>
                          <table>
                            <tr>
                              <td>Chất liệu: <span className="product-info-detail">{product.productInfoDetail.material}</span></td>
                            </tr>
                            <tr>
                              <td>Xuất xứ: <span className="product-info-detail">{product.productInfoDetail.origin}</span></td>
                            </tr>
                            <tr>
                              <td>Kích thước: <span className="product-info-detail">{product.productInfoDetail.size}</span></td>      
                            </tr>
                            <tr>
                              <td>Khuyến nghị độ tuổi: <span className="product-info-detail">{product.productInfoDetail.applicationAge}</span></td>      
                            </tr>
                            
                          </table>
                        </>) : <></>}

                        {/* BABYMOM */}
                        {product.category === "babymom" ? (<>
                          <div className="product-name">Thông tin sản phẩm</div>
                          <table>
                            <tr>
                              <td>Xuất xứ: <span className="product-info-detail">{product.productInfoDetail.origin}</span></td>
                            </tr>
                            <tr>
                              <td>Hãng: <span className="product-info-detail">{product.productInfoDetail.brand}</span></td>
                            </tr>
                            
                            <tr>
                              <td>Hướng dẫn sử dụng: <p className="product-info-detail product-new-line">{product.productInfoDetail.manual}</p></td>      
                            </tr>
                            
                          </table>
                        </>) : <></>}
                      </div>
                      
                      </div>
                  </div>
                  </div>

                  {/* RATING */}
                  <div className="row my-5">
                  <div className="row-md-6">
                      <h5 className="mb-3">NHẬN XÉT, ĐÁNH GIÁ</h5>
                      {
                      product.reviews.length === 0 ? (
                        <Message variant={"alert-info mt-3"}>Sản phẩm không có đánh giá nào</Message>
                      ) : (
                        product.reviews.map((review, index) => (
                          <div key={index} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                            <strong>{`${review.name} `}</strong>
                            <Rating value={`${review.rating}`} />
                            <span>{` ${moment(review.createdAt).calendar()}`}</span>
                            <div className="alert alert-info mt-3">
                              {review.comment}
                            </div>
                          </div>
                        ))
                      )
                    }
                  </div>
                  
                  </div>
              </div>
            )}
          </section>
        </main>
      </>
    
    
  );
};

export default SingleProduct;