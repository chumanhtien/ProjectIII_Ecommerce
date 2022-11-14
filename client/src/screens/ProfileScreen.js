import React, { useEffect } from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../Redux/Actions/UserActions";
import { getAllUserOrders } from "../Redux/Actions/OrderActions";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import Toast from "../components/LoadingError/Toast";
import { toast } from "react-toastify";
import { ORDER_DELETE_RESET } from "../Redux/Constants/OrderConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}
const ProfileScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const orderListOfUser = useSelector((state) => state.orderListOfUser);
  const {loading, error, orders} = orderListOfUser;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {success, orderDeleted} = orderDelete;

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getAllUserOrders());
    if (success && orderDeleted) {
      toast.success(`Xóa thành công Đơn hàng với Mã ID là ${orderDeleted._id}!`, ToastObjects);
      dispatch({type: ORDER_DELETE_RESET});
    }
  }, [dispatch, success]);

  return (
    <>
    <Toast/>
      <Header />
        <div className="container mt-lg-5 mt-3" style={{"minHeight": "100vh"}}>
          <div className="row align-items-start">
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <img src="./images/user.png" alt="userprofileimage" />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{userInfo.name}</strong>
                    </h5>
                    <span className="author-card-position">
                      <>Đăng ký: {moment(userInfo.createdAt).format("LL")}</>
                    </span>
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div class="d-flex align-items-start">
                  <div
                    class="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Cài đặt thông tin cá nhân
                    </button>
                    <button
                      class="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Danh sách đơn đặt hàng
                      <span className="badge2">{orders ? orders.length : 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div
              class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
              id="v-pills-tabContent"
            >
              <div
                class="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <ProfileTabs />
              </div>
              <div
                class="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <Orders orders={orders} loading={loading} error={error}/>
              </div>
            </div>
          </div>
        </div>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default ProfileScreen;
