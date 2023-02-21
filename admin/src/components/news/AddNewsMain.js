import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addANewsByAdmin, createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_ADMIN_ADD_NEWS_RESET, PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast"

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const AddNewsMain = () => {

  // const [category, setCategory] = useState("");
  // console.log("categoty: ", category);
  
  const [title, setTitle] = useState("");
  const [sourceID, setSourceID] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [url, setUrl] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  // console.log("sourceID: ", sourceID, "sourceName: ", sourceName, "Title: ", title, "author: ", author, "url: ", url, "urlToimage: ", urlToImage, "desscription: ", description, "content: ", content);

  const dispatch = useDispatch();
  const singleNewsAddByAdmin = useSelector((state) => state.singleNewsAddByAdmin);
  const {loading, success, newsAdded} = singleNewsAddByAdmin;

  useEffect(() => {
    if (success) {
      toast.success("Thêm Tin tức thành công!", ToastObjects);
      dispatch({type: PRODUCT_ADMIN_ADD_NEWS_RESET});
      setTitle("");
      setAuthor("");
      setSourceID("");
      setSourceName("");
      setUrl("");
      setUrlToImage("");
      setDescription("");
      setContent("");
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!url) {
      setUrl("/news/noibo");
    }
    dispatch(addANewsByAdmin({
      source: {
        id: sourceID,
        name: sourceName,
      },
      title, 
      author, 
      description, 
      content,   
      url, 
      urlToImage
    }))
    }
  
  
  return (
    <>
    <Toast/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="content-header">
            <Link to="/news" className="btn btn-danger text-white">
              Trở lại trang Tin tức
            </Link>
            <h2 className="content-title">Thêm Tin tức</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Xác nhận Thêm
              </button>
            </div>
          </div>

          <div className="row mb-3 f-flex justify-content-center">
            <div className="col-xl-11 col-lg-9">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  {loading && <Loading/>}
                  <div className="mb-3 d-flex flex-row justify-content-between">
                    <div className="col-lg-5">
                      <label htmlFor="news_source_id" className="form-label">
                        Source ID
                      </label>
                      <div>
                        <form 
                          value={sourceID}
                          className="searchform" 
                          onChange={(e) => {
                            setSourceID(e.target.value);
                            setSourceName(e.target.value === 'noibo' ? "Nội bộ" : "");
                          }}>
                          <div className="input-group">
                            <input
                              list="category_items"
                              type="text"
                              className="form-control"
                              placeholder="Chọn Source ID..."
                            />
                            {/* <button className="btn btn-light bg" type="button">
                              <i className="far fa-search"></i>
                            </button> */}
                          </div>
                            <datalist id="category_items">
                              <option value={'noibo'} key={'noibo'}>Nội bộ</option>
                              <option value={'other'} key={'other'}>Nguồn khác</option>
                            </datalist>
                          
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <label htmlFor="news_source_name" className="form-label">
                        Tên nguồn Tin tức
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="news_source_name"
                        required 
                        value={sourceName}
                        onChange={(e) => setSourceName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">                 
                      <label htmlFor="news_author" className="form-label">
                        Tác giả
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="news_author"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    
                  </div>
                  <div className="mb-3">
                      <label htmlFor="news_title" className="form-label">
                        Tiêu đề
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="news_title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                  </div> 
                  {sourceID === 'other' && (
                    <div className="mb-3">
                      <label htmlFor="news_url" className="form-label">
                        Đường dẫn URL
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="news_url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </div> 
                  )}
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="news_description">Mô tả</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="3"
                      id="news_description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="news_content">Nội dung</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="9"
                      id="news_content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="news_url_image">Url Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      id="news_url_image"
                      placeholder="Enter Image URL"
                      value={urlToImage}
                      onChange={(e) => setUrlToImage(e.target.value)}
                      required
                    />
                    {/* <input className="form-control mt-3" type="file" /> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddNewsMain;
