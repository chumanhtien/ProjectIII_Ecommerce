import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import Orders from "../../components/orders/Orders";
import Sidebar from "../../components/sidebar";
import { getAllUserOrdersByAdmin } from "../../Redux/Actions/OrderActions";
import { getUserInfo } from "../../Redux/Actions/UserActions";

const ProfileScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const userInfoDetails = useSelector((state) => state.userInfoDetails);
    const {loading, error, user} = userInfoDetails;

    const orderAdminGetUserOrders = useSelector((state) => state.orderAdminGetUserOrders);
    const {loadingGetAllOrders, errorGetAllOrders, orders} = orderAdminGetUserOrders;
    


    useEffect(() => {
        dispatch(getUserInfo(id));
        dispatch(getAllUserOrdersByAdmin(id));
    }, [dispatch, id]);
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <div className="content-header mt-3 d-flex flex-column align-items-start" style={{"margin-left": "10px"}}>
                    <Link to="/users" className="btn btn-danger text-white ">
                        Trở lại trang Người dùng
                    </Link>
                    <h2 className="content-title d-flex flex row align-self-center">Thông tin người dùng</h2>
                </div>
                <div className="card-body mt-3">
                    {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
                        <>
                            <div className="d-flex flex-row justify-content-evenly">
                                <div className="author-card pb-0 pb-md-3 col-lg-5">
                                    <div className="author-card-cover"></div>
                                    <div className="author-card row">
                                        <div className="author-card-avatar col-md-5">
                                            <img src="/images/user.png" alt="userprofileimage" />
                                            <strong><h6>{"Khách hàng"}</h6></strong>
                                        </div>
                                        <div className="author-card-details col-md-6">
                                            <h5 className="author-card-name mb-2">
                                                <strong>{user.name}</strong>
                                                
                                            </h5>
                                            <span className="author-card-position">
                                                <strong>Đăng ký: </strong>{moment(user.createdAt).format("llll")}
                                            </span>
                                        </div>
                                    </div>
                                    {user.isBlocked && <h5 style={{"color": "red"}} className="author-card-profile text-center">
                                        Người dùng đã bị Chặn!
                                    </h5>}
                                </div>
                                {/* panels */}
                                <div className="mb-3 col-lg-5">
                                    <div className="mb-3 ">
                                        <label className="mb-1" for="account-fn"><strong>Tên Người dùng</strong></label>
                                        <input 
                                            className="form-control card-user-info" 
                                            type="text" 
                                            id="account-fn"
                                            value={user.name}
                                            disabled
                                            />
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-1" for="account-email"><strong>E-mail</strong></label>
                                        <input 
                                            className="form-control card-user-info" 
                                            type="email"
                                            value={user.email}
                                            disabled
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="mb-1" for="account-pass"><strong>Mật khẩu</strong></label>
                                        <input 
                                            className="form-control card-user-info" 
                                            type="password" 
                                            id="account-pass"
                                            value={user.password || "password"}
                                            disabled
                                        />
                                    </div>
                                    
                                </div>

                            </div>
                        </>
                    )}
                    
                </div>
               
                <div className="card-body">
                    <h3>Danh sách đơn đặt hàng</h3>
                    <div className="table-responsive">
                        {loadingGetAllOrders ? <Loading/> : errorGetAllOrders ? <Message variant={"alert-danger"}>{errorGetAllOrders}</Message> : 
                        (
                            <Orders orders={orders}/>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfileScreen;