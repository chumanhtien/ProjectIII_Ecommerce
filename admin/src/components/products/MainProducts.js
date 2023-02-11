import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
// import shoesProducts from "./../../data/shoesProducts";
// import dtddProducts from "./../../data/dtddProducts";
// import manclothesProducts from "../../data/manclothesProducts";
// import babymomProducts from "../../data/babymom";
// import toysProducts from "../../data/toys";
import {useDispatch, useSelector} from "react-redux"   
import { getAllProducts, getListCategories } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment"
import Pagination from "../Home/Pagination";
import { PRODUCT_DELETE_RESET } from "../../Redux/Constants/ProductConstants";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const sortByMap = ["vuathem", "datnhat", "renhat"];
const NUMBER_PRODUCTS_PERPAGE = 6;
const Toastobjects = {
  pasueOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000 // ms
};

const MainProducts = () => {
  window.scroll(0, 0);

  const navigate = useNavigate()
  // Pagination
  let pages = 0;  
  
  let page = Number(useParams().pageNumber);
  console.log(page);
  if (!page)
    page = 1;

  //Search
  const [keyword, setKeyword] = useState('');
  console.log(keyword);


  // const products = dtddProducts;
  const dispatch = useDispatch();

  const [categoryOption, setCategoryOption] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const {loading : loadingCategory,  error : errorCategory, categories} = categoryList;
  const productGetAll = useSelector((state) => state.productGetAll);
  const {loading, error, allProducts} = productGetAll;

  const productDelete = useSelector((state) => state.productDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete, productDeteled} = productDelete;

  if (productDeteled) {
    console.log("project Deleted: ", productDeteled);
  }

  console.log("Category Option: ", categoryOption);
  useEffect(() => {
    dispatch(getListCategories());
    dispatch(getAllProducts());
    if (successDelete) {
      toast.success("Xóa sản phẩm thành công!", Toastobjects);
      dispatch({type: PRODUCT_DELETE_RESET});
    }
  }, [dispatch, successDelete]);

  let products = [];
  
  if (allProducts) {
    switch (categoryOption) {
      case "mobiles":
        products = allProducts.mobilesProducts;
        break;
      case "shoes":
        products = allProducts.shoesProducts;
        break;
      case "manclothes":
        products = allProducts.manClothesProducts;
        break;
      case "toys":
        products = allProducts.toysProducts;
        break;
      case "babymom":
        products = allProducts.babymomProducts;
        break;
      default: 
        products = allProducts.products;

      
    }

    if (products) {
      // console.log(typeof moment(products[1].createdAt).diff(moment(products[0].createdAt)))
      switch (sortBy) {
        case "Vừa thêm":
          products = products.sort(function(a, b) {return Number(moment(b.createdAt).diff(moment(a.createdAt)))});
          break;
        case "Rẻ nhất": 
          products = products.sort((a, b) => a.price - b.price);
          break;  
        case "Đắt nhất":
          products = products.sort((a, b) => b.price - a.price);
          break;
        default:
          
      }
      pages = (products ? Math.ceil((products.length / (NUMBER_PRODUCTS_PERPAGE))) : 0);
      console.log(pages);
    }
    
    if (page && products) {
      products = products.slice((page - 1) * NUMBER_PRODUCTS_PERPAGE, page * NUMBER_PRODUCTS_PERPAGE);
    }
    
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllProducts(keyword));
    
    navigate(keyword ? categoryOption ? (`/products/${categoryOption}/search/keyword=${keyword}`)
    : (`/products/search/keyword=${keyword}`)
    : categoryOption ? (`/products/${categoryOption}`) : (`/products`))
  }

  return (
    <section className="content-main" min-width="700px">
      <Toast/>
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Thêm mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-search col-lg-4 col-md-6 me-auto">
              <form className="searchform"  onSubmit={submitHandler}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button className="btn btn-light bg" type="button"  onClick={submitHandler}>
                    {/* <i className="far fa-search"></i> */}
                    <FontAwesomeIcon className="icon" icon={solid('search')} />
                  </button>
                </div>
                
              </form>
            </div>
            

            <div className="col-lg-2 col-6 col-md-3">
              {loadingCategory ? <Loading/> : errorCategory ? <Message variant={"alert-danger"}>{errorCategory}</Message> : (
                <select value={categoryOption} 
                  onChange={(e) => {
                    
                    // if (keyword) {
                    //   if (categoryOption) {
                    //     navigate(`/products/${e.target.value}/search/keyword=${keyword}`)
                    //   } else {
                    //     navigate(`/products/search/keyword=${keyword}`)
                    //   }
                    // }
                    // else {
                    //   if (categoryOption) {
                    //     navigate(`/products/${e.target.value}`)
                    //   } else {
                    //     navigate(`/products`)
                    //   }
                    // }
                    setCategoryOption(e.target.value);
                    if (!keyword)
                      navigate(`/products/${e.target.value}`)
                    
                  }}
                  className="form-select">
                  <option value={""}>Tất cả</option>
                  {categories.map((categoryItem, index) => (
                    <option value={categoryItem.name} key={index}>{categoryItem.mapName}</option>
                  ))}
                  {/* <option>DTDD</option>
                  <option>Giày dép</option>
                  <option>Quần áo</option>   */}
              </select>
              )
              }
              
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                <option value={""}>Sắp xếp</option>
                {sortByMap.map((sortByItem, index) => (
                  <option key={index}>{sortByItem === "vuathem" ? "Vừa thêm" : sortByItem === "datnhat" ? "Đắt nhất" : "Rẻ nhất"}</option>
                ))}
              </select>
            </div>
          </div>
          
        </header>

        <div className="card-body">
          {errorDelete && (<Message variant={"alert-danger"}>{errorDelete}</Message>)}
          {error && (<Message variant={"alert-danger"}>{error}</Message>)}
          {loading && <Loading/>}
          <div className="row">
            {/* Products */}
            {products ? products.map((product) => (
              <Product product={product} key={product._id}/>
            )) : <></>}
            
          </div>

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {pages > 1 && (<Pagination pages={pages} page={page} category={categoryOption} keyword={keyword} pathName={'products'}/>)}
              
              {/* <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Trang sau
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
