import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { CurrencyFormatter } from "../components/converterComponents/CurrencyFormatter";

// import dtddProducts from "../data/dtddProducts";
// import shoesProducts from "../data/shoesProducts";
// import manclothesProducts from "../data/manclothesProducts";
import { useNavigate, useParams } from "react-router";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getSingleProductDetails } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
// import CurrencyFormat from 'react-currency-format';
import {toast} from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { CurrrencyFormatter } from "../components/converterComponents/CurrencyFormatter";


// import { addToCart } from "../Redux/Actions/CartActions";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}
const SingleProduct = (props) => {
  
  // const product = products.find((p) => p._id === match.params.id);
  // const products = dtddProducts;
  // const products = dtddProducts;
  const {category} = props;
  // const {category} = useParams();
  console.log(category);
  const {id} = useParams();
  console.log("id: ",  id);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

 
  //Shoes
  const [shoeSize, setShoeSize] = useState("");
  if (category === 'shoes')
    console.log("Shoe Size: ", shoeSize);
  
  //Clothes
  const [imgProduct, setImgProduct] = useState("");
  const [manClothesSize, setManClothesSize] = useState("");
  const [manClothesColor, setManClothesColor] = useState("");
  if (category === 'manclothes') {
    console.log("Man Clothes Size: ", manClothesSize);
    console.log("Man Clothes Color: ", manClothesColor);
  }


  
  // const href = window.location.href;

  // const category = href.includes('mobiles') ? 'mobiles' : href.includes('shoes') ? 'shoes' : href.includes('manclothes') 
  //                 ? 'manclothes' : href.includes('toys') ? 'toys' : href.includes('babymom') ? 'babymom' : '';
  // console.log("url: ", href);
  

  if (category === '') {
    console.log("NOT have category to show a single product");
  }
  
  // const products = manclothesProducts;
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const {data} = await axios.get(`/api/products/${category}/${id}`);
  //     console.log(data);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [category, id]);


  const dispatch = useDispatch();
  const singleProductDetails = useSelector((state) => state.singleProductDetails);
  const {loading, error, product} = singleProductDetails;

  
  


  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {loading: createReviewLoading, error: createReviewError, success: createReviewSuccess} = productCreateReview;

  useEffect(() => {
    if (createReviewSuccess) {
      alert("Đánh giá sản phẩm thành công");
      // toast.success("Đánh giá sản phẩm thành công", ToastObjects);
      setRating(0);
      setComment("");
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }
    dispatch(getSingleProductDetails(id, category));
  }, [id, category, dispatch, createReviewSuccess]);
  

  if (product) {
    if (product.category === 'shoes' && !shoeSize) {
      setShoeSize(product.productInfoDetail.sizes[0]);
    } 
    else if (product.category === 'manclothes' && (!manClothesColor || !manClothesSize)) {
      setManClothesColor(product.productInfoDetail.colors[0]);
      setManClothesSize(product.productInfoDetail.sizes[0]);
    }
  }
  const navigate = useNavigate();
  const AddToCartHandler = (e) => {
    e.preventDefault();
    if (category === 'shoes') {
      navigate(`/cart/${id}?qty=${qty}?category=${category}?type_size=${shoeSize}?type_color=NULL`);
    }
    else if (category === 'manclothes') {
      navigate(`/cart/${id}?qty=${qty}?category=${category}?type_size=${manClothesSize}?type_color=${manClothesColor}`);
    }
    else {
      navigate(`/cart/${id}?qty=${qty}?category=${category}`);
    }
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, {
      rating, 
      comment,
    }));
  }
  return (
    <>
      <Header />
      <div className="container single-product" style={{"minHeight": "100vh"}}>
        {
          loading ? <Loading/> : error ? (<Message variant={"alert-danger"}>{error}</Message>) : (
            <>
            {/* <Toast/> */}
              <div className="row">
                <div className="col-md-6">
                  <div className="single-image">
                    <img src={imgProduct ? imgProduct: product.image} alt={product.name} />
                  </div>
                  {/* <div>
                      <br></br>
                  
                      {/* BABYMOM */}
                      {/* {product.category === "babymom" ? (<>
                        <div className="product-name">Hướng dẫn sử dụng</div>
                        <table>
                          <tr>
                            <td>Hướng dẫn sử dụng: <p className="product-info-detail product-new-line">{product.productInfoDetail.manual}</p></td>      
                          </tr>
                          
                        </table>
                      </>) : <></>}
                  </div> */}
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
                              <span className="product-info-detail">{`${product.productInfoDetail.colors.length} màu: `}</span>
                              {product.productInfoDetail.colors.map((x, index) => (
                                  <span className="product-info-detail" key={index}>{index < product.productInfoDetail.colors.length - 1 ? `${x} | ` : `${x}` }</span>))}
                              <br/>
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
                    <div className="product-count col-lg-10 ">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Giá</h6>
                        {/* <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <span>{value}</span>} /> */}
                        <span>{ CurrencyFormatter(product.price*1000)}</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Trạng thái</h6>
                        {product.countInStock > 0 ? (
                          <span>Còn hàng {` (${product.countInStock})`}</span>
                        ) : (
                          <span>Hết hàng</span>
                        )}

                        
                      </div>
                      {/* Clothes*/}
                      {product.category === "manclothes" ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Size</h6>
                            <select onChange={(e) => setManClothesSize(e.target.value)}>
                              {/* <option key={0} value={""}>Size...</option> */}
                              {product.productInfoDetail.sizes.map((x, index) => (
                                <option key={index + 1} value={x}>
                                  {x}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6 >Màu sắc</h6>
                            <select onChange={(e) => {setImgProduct(e.target.value); console.log(e.target.value); setManClothesColor(e.target.value.split("/")[3].split(".")[0].split("_")[2])}}>
                              {/* <option key={0} value={""}>Màu...</option> */}
                              {product.productInfoDetail.colors.map((x, index) => (
                                <option key={index + 1} value={product.productInfoDetail.images_list ? product.productInfoDetail.images_list[index] : product.image} >
                                  {x}
                                </option>
                              ))}
                            </select>
                    </div>
                        </>
                      ) : (<></>)}
                      {/* Shoes */}
                      {product.category === "shoes" ? (
                        <>
                        
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Size</h6>
                            <select onChange={(e) => setShoeSize(e.target.value)}>
                              {product.productInfoDetail.sizes.map((x, index) => (
                                <option key={index + 1} value={x}>
                                  {x}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                        </>
                      ) : (<></>)}
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Số lượng</h6>
                      <select size="1" onClick={(e) => {setQty(e.target.value)}}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick = {AddToCartHandler} className="round-black-btn">Thêm vào Giỏ</button>
                  </>
                ) : null}
                    </div>
                  </div>
                </div>
              </div>

            {/* RATING */}
              <div className="row my-5">
                <div className="col-md-6">
                  <h6 className="mb-3"><b>NHẬN XÉT, ĐÁNH GIÁ</b></h6>
                  {
                    product.reviews.length === 0 ? (
                      <Message variant={"alert-info mt-3"}>Không có đánh giá nào</Message>
                    ) : (
                      product.reviews.map((review, index) => (
                        <div key={index} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <span>{moment(review.createdAt).calendar()}</span>
                          <div className="alert alert-info mt-3">
                            {review.comment}
                          </div>
                        </div>
                      ))
                    )
                  }
                  
                  
                </div>
                <div className="col-md-6">
                  <h6><b>VIẾT NHẬN XÉT, ĐÁNH GIÁ SẢN PHẨM</b></h6>
                  <div className="my-4"></div>
                  {createReviewLoading && <Loading/>}
                  {createReviewError && <Message variant={"alert-danger"}>{createReviewError}</Message>}
                  {
                    userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="my-4">
                          <strong>Đánh giá</strong>
                          <select value={rating} 
                                onChange={(e) => setRating(e.target.value)}
                                className="col-12 bg-light p-3 mt-2 border-0 rounded">
                            <option value="">Select...</option>
                            <option value="1">1 - Tồi</option>
                            <option value="2">2 - Tạm ổn</option>
                            <option value="3">3 - Bình thường</option>
                            <option value="4">4 - Tốt</option>
                            <option value="5">5 - Rất tốt</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Nội dung</strong>
                          <textarea
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button disabled={createReviewLoading} className="col-12 bg-black border-0 p-3 rounded text-white">
                            ĐÁNH GIÁ
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Bạn hãy{" "}
                          <Link to="/login">
                            " <strong>Đăng nhập</strong> "
                          </Link>{" "}
                          để đánh giá sản phẩm{" "}
                        </Message>
                      </div>
                    )
                  }
                  
                  
                </div>
              </div>
            </>
          )
        }
        
      </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default SingleProduct;
