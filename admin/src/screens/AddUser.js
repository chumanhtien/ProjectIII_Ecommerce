import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Sidebar from "../components/sidebar";
import Toast from "../components/LoadingError/Toast"
import { addAnUser } from "../Redux/Actions/UserActions";
import { USER_ADMIN_ADD_USER_RESET } from "../Redux/Constants/UserConstants";


const Toastobjects = {
    pasueOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000 // ms
}

const AddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(name, email, password);

    const dispatch = useDispatch();
    const userAddInfo = useSelector((state) => state.userAddInfo);
    const {loading, error, user} = userAddInfo;
    
    useEffect(() => {
        if (user) {
            //Toast Success
            toast.success("Thêm mới người dùng thành công", Toastobjects);
            dispatch({type: USER_ADMIN_ADD_USER_RESET});
            setName("");
            setEmail("");
            setPassword("");
        }
    }, [dispatch, user])

    const addUserHandler = () => {
        dispatch(addAnUser({
            name,
            email,
            password,
        }))
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
                    <h2 className="content-title d-flex flex row align-self-center">Thêm Tài khoản người dùng</h2>
                </div>
                <div className="card-body mt-3">
                    {loading && <Loading/>}
                    {error && <Message variant={"alert-danger"}>{error}</Message>}
                    <>
                        <div className="d-flex flex-row justify-content-evenly">
                            <div className="author-card pb-0 pb-md-3 col-lg-4">
                                <div className="author-card-cover"></div>
                                <div className="author-card row">
                                    <div className="author-card-avatar col-md-5">
                                        <img src="/images/user.png" alt="userprofileimage" />
                                        <strong><h6>{"Khách hàng"}</h6></strong>
                                    </div>
                                    <div className="author-card-details col-md-6">
                                        <h5 className="author-card-name mb-2">
                                            <strong></strong>
                                            
                                        </h5>
                                        <span className="author-card-position">
                                            <strong>Đăng ký: </strong>
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                            {/* panels */}
                            <div className="mb-3 col-lg-6">
                                
                                <div className="mb-3 ">
                                    <label className="mb-1" for="account-fn"><strong>Tên Người dùng</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        id="account-fn"
                                        value={name}
                                        placeholder="Nhập tên Người dùng"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        />
                                </div>

                                <div className="mb-3">
                                    <label className="mb-1" for="account-email"><strong>E-mail</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="email"
                                        placeholder="Nhập Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="mb-1" for="account-pass"><strong>Mật khẩu</strong></label>
                                    <input 
                                        className="form-control" 
                                        type="password" 
                                        placeholder="Nhập Mật khẩu"
                                        id="account-pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="mb-1" for="account-confirm-pass"><strong>Vai trò</strong></label>
                                    <div className="mb-1">
                                        <div className="input-group">
                                            <input
                                                list="category_items"
                                                type="text"
                                                className="form-control card-user-info"
                                                placeholder="Chọn Vai trò..."
                                                value={"Khách hàng"}
                                                disabled
                                            />
                                        </div>
                                        <datalist id="category_items">
                                            <option value={"Admin"}>{"Admin"}</option>
                                            <option value={"Khách hàng"}>{"Khách hàng"}</option>

                                        </datalist>  
                                    </div>
                                </div>
                                <Link 
                                    onClick={addUserHandler}
                                    to="#" className="btn mt-4 btn-success text-white d-flex flex-column align-self-center">
                                    Thêm Người Dùng
                                </Link>
                            </div>

                        </div>
                    </>  
                </div>
            </main>
        </>
    )
}

export default AddUser;