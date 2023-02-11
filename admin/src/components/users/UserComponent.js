import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blockUser, deleteAnUser, listUser, unBlockUser } from "../../Redux/Actions/UserActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { USER_ADMIN_DELETE_USER_RESET, USER_BLOCKED_RESET, USER_UNBLOCKED_RESET } from "../../Redux/Constants/UserConstants";
import Pagination from "../Home/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}
const NUMBER_USER_PERPAGE = 3;

const UserComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Pagination
  let pages = 0;  
  
  let page = Number(useParams().pageNumber);
  if (!page)
    page = 1;
  console.log("page= ", page);


  const userList = useSelector((state) => state.userList);
  const {loading, error, users} = userList;

  const userBlocked = useSelector((state) => state.userBlocked);
  const {loading: loadingBlocked, success: successBlocked, error: errorBlocked} = userBlocked;

  const userUnBlocked = useSelector((state) => state.userUnBlocked);
  const {loading: loadingUnBlocked, success: successUnBlocked, error: errorUnBlocked} = userUnBlocked;

  const userDeleteInfo = useSelector((state) => state.userDeleteInfo);
  const { success: successDelete} = userDeleteInfo;
  // const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(listUser());
    if (successBlocked) {
      toast.warn("Bạn vừa khóa Người dùng!", ToastObjects);
      dispatch({type: USER_BLOCKED_RESET});
    } else if (errorBlocked) {
      toast.error(errorBlocked, ToastObjects);
    }
    if (successUnBlocked) {
      toast.success("Bạn vừa Mở khóa cho Người dùng!", ToastObjects);
      dispatch({type: USER_UNBLOCKED_RESET});
    } else if (errorUnBlocked) {
      toast.error(errorUnBlocked, ToastObjects);
    }
    if (successDelete) {
      toast.warn("Bạn vừa Xóa Người dùng!", ToastObjects);
      dispatch({ type: USER_ADMIN_DELETE_USER_RESET });
    }
    
  }, [dispatch, successBlocked, successUnBlocked, successDelete, errorBlocked, errorUnBlocked, page]);

  const blockHandler = (id) => {
    dispatch(blockUser(id));
  } 

  const unBlockHandler = (id) => {
    dispatch(unBlockUser(id));
  } 
  const deleteUserHandler = (id) => {
    if (window.confirm("Bạn có muốn xóa Người dùng này?")) {
      dispatch(deleteAnUser(id));
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listUser(keyword));
    navigate(keyword ? (`/users/search/keyword=${keyword}`): (`/users`))
  }
  let usersToPrint = [];
  if (users) {
    pages = (users ? Math.ceil((users.length / (NUMBER_USER_PERPAGE))) : 0);
    // console.log(pages);
  }
  if (page && users) {
    usersToPrint = users.slice((page - 1) * NUMBER_USER_PERPAGE, page * NUMBER_USER_PERPAGE);
  }

  return (
    <section className="content-main">
      <Toast/>
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="/users/add" className="btn btn-primary">
            <FontAwesomeIcon className="icon" icon={solid('plus')} /> Tạo mới người dùng
            {/* <i className="material-icons md-plus"></i> Tạo mới người dùng */}
          </Link>
        </div>
      </div>

      <div className="card mb-4">
      <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-search col-lg-4 col-md-6 me-auto">
              <form className="searchform" onSubmit={submitHandler}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button className="btn btn-light bg" type="button">
                    {/* <i className="far fa-search"></i> */}
                    <FontAwesomeIcon className="icon" icon={solid('search')}/>
                  </button>
                </div>
                
              </form>
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                <option value={""}>All</option>
                {sortByMap.map((sortByItem, index) => (
                  <option key={index}>{sortByItem === "vuathem" ? "Vừa thêm" : sortByItem === "datnhat" ? "Đắt nhất" : "Rẻ nhất"}</option>
                ))}
              </select>
            </div> */}
          </div>
          
        </header>
        {/* <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header> */}

        {/* Card */}
        <div className="card-body">
          {
            loading ? (<Loading/>) : error ? (<Message variant={"alert-danger"}>{error}</Message>) : 
            (<>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3">
                {usersToPrint && usersToPrint.map((user, index) => (
                  user.isBlocked ? (
                    <div className="col" key={index}>
                      <div className="card card-user-block shadow-sm">
                        <div className="card-header">
                          <img
                            className="img-md img-avatar"
                            src="/images/favicon.png"
                            alt="User pic"
                          />
                        </div>
                        <div className="card-body ">
                          <h5 className="card-title mt-5">{user.name}</h5>
                          <div className="card-text text-muted">
                            {
                              (user.role === 1) ? (<p className="m-0">Admin</p>) : 
                              (<p className="m-0">Khách hàng</p>)
                            }

                            <p>
                              <a style={{"display": "inline-block"}}
                                href={`mailto:${user.email}`}>
                                {user.email}
                              </a>
                            </p>
                          </div>
                          <div className="row mb-2 d-flex flex-row justify-content-evenly">
                            {(loadingBlocked || loadingUnBlocked) && <Loading/>}
                            <Link
                              to={`/users/${user._id}/editprofile`}
                              title="Sửa thông tin"
                              className="btn btn-sm btn-outline-warning p-2 pb-3 col-md-3"
                            >
                              Sua
                              {/* <i className="fas fa-pen"></i> */}
                            </Link>
                          
                            <Link
                              to={`/users/${user._id}/profile`}
                              title="Xem thông tin"
                              className="btn btn-sm btn-outline-success p-2 pb-3 col-md-3"
                            >
                              <FontAwesomeIcon className="icon" icon={solid('eye')}/>
                              {/* <i className="fas fa-eye"></i> */}
                            </Link>
                            <Link
                              to="#"
                              title="Xóa"
                              onClick={() => deleteUserHandler(user._id)}
                              className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-3"
                            >
                              {/* <i className="fas fa-trash-alt"></i> */}
                                <FontAwesomeIcon className="icon" icon={solid('trash')} />
                            </Link>
                          </div>
                          <div className="row d-flex flex-row justify-content-evenly">
                            <button
                              onClick={() => unBlockHandler(user._id)}
                              className="btn btn-info col-11">
                              <span>BỎ CHẶN</span>
                            </button>
                            
                          </div>
                        </div>    
                      </div>
                    </div>
                  ) : (
                    <div className="col" key={index}>
                      <div className="card card-user shadow-sm">
                        <div className="card-header">
                          <img
                            className="img-md img-avatar"
                            src="/images/favicon.png"
                            alt="User pic"
                          />
                        </div>
                        <div className="card-body ">
                          <h5 className="card-title mt-5">{user.name}</h5>
                          <div className="card-text text-muted">
                            {
                              (user.role === 1) ? (<p className="m-0">Admin</p>) : 
                              (<p className="m-0">Khách hàng</p>)
                            }

                            <p>
                              <a style={{"display": "inline-block"}}
                                href={`mailto:${user.email}`}>
                                {user.email}
                              </a>
                            </p>
                          </div>
                          <div className="row mb-2 d-flex flex-row justify-content-evenly">
                            <Link
                              to={`/users/${user._id}/editprofile`}
                              title="Sửa thông tin"
                              className="btn btn-sm btn-outline-warning p-2 pb-3 col-md-3"
                            >
                              <FontAwesomeIcon className="icon" icon={solid('pen')} />
                              {/* <i className="fas fa-pen"></i> */}
                            </Link>
                          
                            <Link
                              to={`/users/${user._id}/profile`}
                              title="Xem thông tin"
                              className="btn btn-sm btn-outline-success p-2 pb-3 col-md-3"
                            >
                                {/* <i className="fas fa-eye"></i> */}
                                <FontAwesomeIcon className="icon" icon={solid('eye')} />
                            </Link>
                            <Link
                              to="#"
                              onClick={() => deleteUserHandler(user._id)}
                              title="Xóa"
                              className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-3"
                              >
                              <FontAwesomeIcon className="icon" icon={solid('trash')} />
                              {/* <i className="fas fa-trash-alt"></i> */}
                            </Link>
                          </div>
                          <div className="row d-flex flex-row justify-content-evenly">
                            <button
                              onClick={() => blockHandler(user._id)}
                              className="btn btn-danger col-11">
                              <span>CHẶN</span>
                            </button>
                            
                          </div>
                        </div>    
                      </div>
                    </div>
                  )
                )) }
                
                {/* user */}
                {/* <div className="col">
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">User</h5>
                      <div className="card-text text-muted">
                        <p className="m-0">Customer</p>
                        <p>
                          <a href={`mailto:admin@example.com`}>user@example.com</a>
                        </p>
                      </div>
                      <div className="row">
                        <Link
                          to="#"
                          className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                        >
                          <FontAwesomeIcon className="icon" icon={solid('pen')} />
                          // <i className="fas fa-pen"></i>
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                        >
                          <FontAwesomeIcon className="icon" icon={solid('trash')} />
                          // <i className="fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    </div>
                    
                  </div>
                </div> */}
              </div>
            </>)
          }
          

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              {pages > 1 && (<Pagination pages={pages} page={page} keyword={keyword} pathName={'users'}/>)}
              
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

export default UserComponent;
