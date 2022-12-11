import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Product from "../products/Product";
// import shoesProducts from "./../../data/shoesProducts";
// import dtddProducts from "./../../data/dtddProducts";
// import manclothesProducts from "../../data/manclothesProducts";
// import babymomProducts from "../../data/babymom";
// import toysProducts from "../../data/toys";
import {useDispatch, useSelector} from "react-redux"   
import { getALLNews, getAllProducts, getListCategories } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment"
import Pagination from "../Home/Pagination";
import NewsCard from "./NewsCard";
import NewsPagination from "../Home/NewsPagination";
import Toast from "../LoadingError/Toast";
import { PRODUCT_ADMIN_DELETE_NEWS_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
const sortByMap = ["vuathem", "datnhat", "renhat"];
const NUMBER_NEWS_PER_PAGE = 4;
const Toastobjects = {
  pasueOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000 // ms
};


const MainNews = () => {
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

  const [filterByID, setFilterByID] = useState("");
  const [sortBy, setSortBy] = useState("");

  const newsListByAdmin = useSelector((state) => state.newsListByAdmin);
  const {loading, error, news} = newsListByAdmin;

  const newsDeleteByAdmin = useSelector((state) => state.newsDeleteByAdmin);
  const {loading: loadingDelete, error: errorDelete, success: successDelete, newsDeleted} = newsDeleteByAdmin;


 
  let newsItems = [];
  if (news) {
    //Filter by ID
    switch(filterByID) {
      case 'noibo':
        newsItems = news.filter((newItem) => newItem.source.id === 'noibo')
        break;
      case 'other':
        newsItems = news.filter((newItem) => newItem.source.id !== 'noibo')
        break;
      default:
        newsItems = news;
    }

    // console.log(newItems);

    //sortBy
    switch(sortBy) {
      case 'newest':
        newsItems = newsItems.sort((a, b) => Number(moment(b.publishedAt).diff(moment(a.publishedAt))))
        break;
      case 'oldest':
        newsItems = newsItems.sort((a, b) => Number(moment(a.publishedAt).diff(moment(b.publishedAt))))
        break;
      default:
        newsItems = newsItems;
    }

    
    //
    if (newsItems) {
      pages = newsItems ? Math.ceil(newsItems.length / NUMBER_NEWS_PER_PAGE) : 0;
      console.log(" News Pages: ", pages);
    }
    

  }

  //panigation
  if (newsItems && page) {
    newsItems = newsItems.slice((page - 1) * NUMBER_NEWS_PER_PAGE, page * NUMBER_NEWS_PER_PAGE);
  }

//   console.log("Category Option: ", categoryOption);
  useEffect(() => {
    dispatch(getALLNews());
    if (successDelete) {
      toast.success("Xóa Tin tức thành công", Toastobjects);
      dispatch({type: PRODUCT_ADMIN_DELETE_NEWS_RESET});
    }
  }, [dispatch, successDelete]);

  
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getALLNews(keyword));
    if (!keyword) {
      setFilterByID("");
      setSortBy("");
    }
    navigate(keyword ? (`/news/search/keyword=\'${keyword}\'`): (`/news`));
    
    
    // navigate(keyword ? categoryOption ? (`/products/${categoryOption}/search/keyword=${keyword}`)
    // : (`/products/search/keyword=${keyword}`)
    // : categoryOption ? (`/products/${categoryOption}`) : (`/products`))
  }

  return (
    <section className="content-main" min-width="700px">
      <Toast/>
      <div className="content-header">
        <h2 className="content-title">Tin tức</h2>
        <div>
          <Link to="/addnews" className="btn btn-primary">
            Thêm mới Tin tức
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
                    <i className="far fa-search"></i>
                  </button>
                </div>
                
              </form>
            </div>
            

            <div className="col-lg-2 col-6 col-md-3">
                <select value={filterByID} 
                  onChange={(e) => {
                    setFilterByID(e.target.value);
                    navigate(e.target.value ? `/news/${e.target.value}` : `/news`)
                    
                  }}
                  className="form-select">
                  <option value={""}>Tất cả</option>
                  <option value={"noibo"}>Nội bộ</option>
                  <option value={"other"}>Nguồn khác</option>
                  {/* <option>DTDD</option>
                  <option>Giày dép</option>
                  <option>Quần áo</option>   */}
              </select>
              
              
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" 
                onChange={(e) => setSortBy(e.target.value)} 
                value={sortBy}
              >
                <option value={""}>Sắp xếp</option>
                <option value={"newest"}>Mới nhất</option>
                <option value={"oldest"}>Lâu nhất</option>
              </select>
            </div>
          </div>
          
        </header>

        <div className="card-body">
          {errorDelete && (<Message variant={"alert-danger"}>{errorDelete}</Message>)}
          {error && (<Message variant={"alert-danger"}>{error}</Message>)}
          {loading && <Loading/>}
          <div className="row">
            {/* News */}
            {newsItems ? newsItems.map((newsItem) => (
              <NewsCard newsInfo={newsItem} key={newsItem._id}/>
            )) : <></>}
            
          </div>

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {pages > 1 && (<NewsPagination pages={pages} page={page} filterByID={filterByID} keyword={keyword} pathName={'news'}/>)}
              
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

export default MainNews;
