import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addVoucherByAdmin } from "../../Redux/Actions/VoucherActions";
import { VOUCHER_SINGLE_CREATE_RESET } from "../../Redux/Constants/VoucherConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import Voucher from "./Voucher";


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}
const VoucherCreateMain = (props) => {

  const [type, setType] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [maxValue, setMaxValue] = useState(-1);
  const [minValue, setMinValue] = useState(-1);
  const [expireAt, setExpireAt] = useState( Date.now());
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const voucherSingleAdd = useSelector((state) => state.voucherSingleAdd);
  const { loading, success, error, voucherAdded } = voucherSingleAdd;

  // const
  // console.log(new Date(expireAt).valueOf() + 0)
  useEffect(() => {
    if (success) {
      //toast
      toast.success("Thêm Mã giảm giá thành công!", ToastObjects);

      dispatch({ type: VOUCHER_SINGLE_CREATE_RESET });
      setType(1);
      setName("");
      setDescription("");
      setDiscount(0);
      setMaxValue(-1);
      setMinValue(-1);
      setExpireAt(new Date().now);
      setIsActive(false);
    }
  }, [dispatch, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addVoucherByAdmin({
      type,
      name,
      description,
      discount,
      minValue,
      maxValue,
      isActive,
      expireAt
    }))
  }
  return (
    <>
      <Toast/>
      <section className="content-main" style={{"minWidth":"700px"}}>
        <div className="content-header">
          <Link to="/vouchers" className="btn btn-danger text-white">
            Trở lại trang Mã giảm giá
          </Link>
          <h2 className="content-title">Thông tin Mã giảm giá</h2>
          <div>
            <Link onClick={(e) => submitHandler(e)} to={"#"} className="btn btn-primary">
              Xác nhận thêm
            </Link>
          </div>
        </div>
        <div className="card mb-4 shadow-sm" style={{" min-width":"700px"}}>      
          <div className="card-body">
                {loading && <Loading />}
                {error ? <Message variant={"alert-danger"}>{error}</Message> : <></>}
            <div className="row">
              <Voucher voucher={{type, name, description, isActive, expireAt}} isCU={true} />
              <div className="col-md-10 col-sm-10 col-lg-6 mb-3">
                <div className="voucher-sub-title">Thông tin</div>
                
                <div className="mb-1">
                  <label htmlFor="voucher_type" className="form-label">
                    Loại
                  </label>
                  <div> 
                    <div className="input-group">
                      <input
                        onChange={(e) => {
                          setType(e.target.value);
                          setName("");
                          setDescription("");
                          setDiscount(0);
                          setMaxValue(-1);
                          setMinValue(-1);
                        }}
                        value={type}
                        id="voucher_type"
                        list="category_items"
                        type="number"
                        className="form-control"
                        placeholder="Chọn Category..."
                        required
                      />
                    </div>
                    <datalist id="category_items">
                      <option value={1}>Phí vận chuyển</option>
                      <option value={2}>Phí sản phẩm (%)</option>
                      <option value={3}>Phí sản phẩm (vnđ)</option>
                    </datalist>
                  </div>
                </div>
                <div className="mb-1">
                  <label htmlFor="voucher_name" className="form-label">
                    Tên Voucher
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="voucher_name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />        
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="voucher_description">Mô tả</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows="3"
                    id="voucher_description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mb-1" style={{ "marginRight": "5px" }}>
                    <label className="form-label" htmlFor="voucher_discount">{`Giảm giá ${Number(type) === 2 ? '(%)' : '(ngàn - vnđ)'} `}</label>
                    <input
                      type={"number"}
                      placeholder="Type here"
                      className="form-control"
                      id="voucher_discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="mb-1">
                    <label className="form-label" htmlFor="voucher_discount_max">{`Tối đa (ngàn vnđ)`}</label>
                    <input
                      type={"number"}
                      placeholder="Type here"
                      className="form-control"
                      id="voucher_discount_max"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>  
                <div className="d-flex justify-content-between">
                  
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="voucher_min">Chi phí đơn hàng tối thiểu</label>
                  <input
                    type={"number"}
                    placeholder="Type here"
                    className="form-control"
                    id="voucher_min"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mb-1 voucher-input-active">
                    <label className="form-label" htmlFor="voucher_active_1">Trạng thái: {isActive ? <span className="voucher-active-text">Đang kích hoạt</span> : <span className="voucher-unactive-text">Chưa kích hoạt</span>}</label>
                    <br/>
                    <input className="voucher-input-active"
                      type={"checkbox"}
                      checked={isActive}
                      value={isActive}
                      onChange={(e) => setIsActive(!isActive)}
                    ></input>
                    <div>
                      
                    </div>
                    {!isActive ? <button className="btn btn-success" onClick={() => setIsActive(!isActive)}>Kích hoạt</button>
                      : <button onClick={() => setIsActive(!isActive)} className="btn btn-danger">Hủy kích hoạt</button>}
                    
                  </div>
                  <div className="mb-1">
                    <label className="form-label" htmlFor="voucher_date_expire">
                      Hạn đến: <i className="voucher_expire_form">
                        {expireAt && `${moment(new Date(expireAt)).format("h:m:s")} ngày ${moment(new Date(expireAt)).format("D/M/Y")}`}
                      </i>
                    </label>
                    <input
                      type={"date"}
                      placeholder="Type here"
                      className="form-control"
                      id="voucher_date_expire"
                      value={moment(expireAt).format("yyyy-MM-DD")}
                      onChange={(e) => setExpireAt((e.target.value))}
                      required
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </section>
    </>
  )
}

export default VoucherCreateMain