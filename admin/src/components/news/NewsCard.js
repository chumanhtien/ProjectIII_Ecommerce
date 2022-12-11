import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteANews } from "../../Redux/Actions/ProductActions"
const NewsCard = (props) => {
  const { newsInfo } = props;

  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("Bạn có muốn xóa Tin tức này?")) {
      dispatch(deleteANews(id));
    }
  }
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-5 mb-5">
        <div className="card card-product-grid shadow-sm  news-img">
          {/* <Link to={`/news/${newsInfo._id}`}
            className="img-wrap">
            <img src={newsInfo.urlToImage} alt="Product" />
          </Link> */}
          { newsInfo.source.id !== 'noibo' ? (
            <a href={newsInfo.url} target="_blank" rel="noreferrer">
              <div className="img-wrap">
                <img src={newsInfo.urlToImage} alt={newsInfo.title} />
              </div>
            </a>
            ) : (
              <Link to={`/news/noibo/${newsInfo._id}`}>
                <div className="img-wrap">
                  <img src={newsInfo.urlToImage} alt={newsInfo.title} />
                </div>
              </Link>
            )
          }
          <div className="info-wrap">
            {newsInfo.source.id === 'noibo' ? 
            (
              <Link to={`/news/noibo/${newsInfo._id}`} 
                className="title mb-2" title={newsInfo.title} style={{"font-size": "21px"}}>
                <b>{newsInfo.title}</b>
              </Link>
            ) : (
              <a href={newsInfo.url} target="_blank" rel="noreferrer" 
                className="title mb-2" title={newsInfo.title} style={{"font-size": "21px"}}>
                <b>{newsInfo.title}</b>
              </a>
            )}
            
            <div className="product-info-detail mb-2">
              {newsInfo.description}
            </div>
            {newsInfo.source.id === 'noibo' ? (
              <p className="mb-2">
                <Link className="title" title={newsInfo.title} to={`${newsInfo.url}/${newsInfo._id}`}>
                  <b style={{"font-size": "20px"}}>Xem thêm</b>
                </Link>
              </p>
            ) : (
              <p className="mb-2">
                <a className="title" title={newsInfo.title} href={newsInfo.url} target="_blank" rel="noreferrer">
                  <b style={{"font-size": "20px"}}>Xem thêm</b>
                </a>
              </p>
            )}
            
            {newsInfo.source.id === "noibo" ? (              
              <div className="text-white btn btn-success mb-3">
                {`#${newsInfo.source.id}`}
              </div>
            ) : (      
              <div className="text-white btn btn-info mb-3">
                {`#${newsInfo.source.id}`}
              </div>
            )}
            
            <div className="product-info-detail text-end mb-1">
              <i>{`${moment(newsInfo.publishedAt).format("llll")}, ${newsInfo.source.name}`}</i>
            </div>
          
            <div className="product-info-detail text-end inline-block mb-1">
              <i>{`Tác giả: ${newsInfo.author}`}</i>
            </div>
            
            <div className="row d-flex justify-content-evenly">
              <Link
                to="#"
                onClick={() => deleteHandler(newsInfo._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-11"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
