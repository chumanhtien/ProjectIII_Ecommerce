import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import Sidebar from "../../components/sidebar";
import Toast from "../../components/LoadingError/Toast"
import { editUserInfoByAdmin, getUserInfo } from "../../Redux/Actions/UserActions";


const Toastobjects = {
pasueOnFocusLoss: false,
draggable: false,
pauseOnHover: false,
autoClose: 2000 // ms
}

const EditProfileScreen = () => {
    const {id} = useParams();

    const toastId = React.useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    const userInfoDetails = useSelector((state) => state.userInfoDetails);
    const {loading, error, user} = userInfoDetails;

    const userEditInfo = useSelector((state) => state.userEditInfo);
    const {loading: loadingEdit, success: successEdit, error: errorEdit} = userEditInfo;

    useEffect(() => {
        dispatch(getUserInfo(id));
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

    }, [dispatch, id, successEdit, user.name, user.email]);

    const editHandler = () => {
        if (password !== confirmPassword) {
            if(!toast.isActive(toastId.current)){ // Chi hien ra 1 Toast tai 1 thoi diem
                toastId.current = toast.error("Mật khẩu xác nhận không khớp", Toastobjects)
            }
        } 
        else {
            dispatch(editUserInfoByAdmin(id, {
                name,
                email,
                password
            }));
            if (!toast.isActive(toastId.current)) { // Chi hien ra 1 Toast tai 1 thoi diem
                if (successEdit) {
                    toastId.current = toast.success("Thông tin Khách hàng đã được thay đổi", Toastobjects)
                }
            }
        }
    }
    return (
        <>
        <Toast/>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <div className="content-header mt-3 d-flex flex-column align-items-start" style={{"margin-left": "10px"}}>
                    <Link to="/users" className="btn btn-danger text-white ">
                        Trở lại trang Người dùng
                    </Link>
                    <h2 className="content-title d-flex flex row align-self-center">Cập nhật Thông tin người dùng</h2>
                </div>
                <div className="card-body mt-3">
                    {loadingEdit && <Loading/>}
                    {errorEdit && <Message variant={"alert-danger"}>{errorEdit}</Message>}
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
                                            className="form-control" 
                                            type="text" 
                                            id="account-fn"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            />
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-1" for="account-email"><strong>E-mail</strong></label>
                                        <input 
                                            className="form-control" 
                                            type="email"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="mb-1" for="account-pass"><strong>Đổi Mật khẩu</strong></label>
                                        <input 
                                            className="form-control" 
                                            type="password" 
                                            id="account-pass"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-1" for="account-confirm-pass"><strong>Xác nhận mật khẩu</strong></label>
                                        <input 
                                            className="form-control" 
                                            type="password"
                                            id="account-confirm-pass"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link 
                                        onClick={editHandler}
                                        to="#" className="btn mt-4 btn-success text-white d-flex flex-column align-self-center">
                                        Xác nhận Thay đổi 
                                    </Link>
                                </div>

                            </div>
                        </>
                    )}
                    
                </div>
            </main>
        </>
    )
}

export default EditProfileScreen;