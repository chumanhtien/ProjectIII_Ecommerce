import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import  {toast}  from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/UserActions";
import {useNavigate} from "react-router"
const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  
  const toastId = React.useRef(null);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000
  };
  const dispatch = useDispatch();
  const userInfoDetail = useSelector((state) => state.userInfoDetail);
  const {loading, error, user} = userInfoDetail;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {loading: updateLoading} = userUpdateProfile;
  useEffect(() => {

    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //password matched
    if (password !== confirmpassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Xác nhận mật khẩu không đúng", ToastObjects);

      }
    } else {
      //
      if (!toast.isActive(toastId.current)) {
        dispatch(updateUserProfile({id: user._id, name, email, password}))
        toastId.current = toast.success("Cập nhật thông tin thành công", ToastObjects);

      }
    }
  }

  const navigate = useNavigate();
  const returnToHomeHandler = () => {
    navigate("/")
  }
  return (
    <>
    <Toast/>
    {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading/>}
    {updateLoading && <Loading/>}
      <form className="row  form-container" >
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input 
              className="form-control" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail</label>
            <input 
              className="form-control" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Đổi mật khẩu</label>
            <input 
              className="form-control" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Xác nhận mật khẩu</label>
            <input 
              className="form-control" 
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6 profile-form-div">
          <button className="profile-form-button" type="submit" onClick={submitHandler}>Xác nhận thay đổi</button>
        </div>
        <div className="col-md-6 profile-form-div">
          <button className="profile-form-button" onClick={returnToHomeHandler}>Quay lại trang chủ</button>
        </div>
        
      </form>
    </>
  );
};

export default ProfileTabs;
