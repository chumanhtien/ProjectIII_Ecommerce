import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Voucher from "./Voucher";

const sortByMap = ["vuathem", "datnhat", "renhat"];

const voucher = {
  _id: '001',
  name: 'Miễn phí vẫn chuyển',
  type: 1,
  description: 'Miễn phí vận chuyển (Lên tới 20k)',
  discount: 20,
  maxValue: -1,
  minValueOfOrderRequire: -1,
  isActive: false,
  expireAt: Date.now() + 10*1000*24*3600
}

const VoucherEditMain = (props) => {

  const { id } = props
  const [type, setType] = useState(voucher.type);
  const [name, setName] = useState(voucher.name);
  const [description, setDescription] = useState(voucher.description);
  const [discount, setDiscount] = useState(voucher.discount);
  const [maxValue, setMaxValue] = useState(voucher.maxValue);
  const [minValue, setMinValue] = useState(voucher.minValueOfOrderRequire);
  const [expireAt, setExpireAt] = useState(voucher.expireAt);
  const [isActive, setIsActive] = useState(voucher.isActive);
  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <section className="content-main" style={{"minWidth":"700px"}}>
      <div className="content-header">
        <Link to="/vouchers" className="btn btn-danger text-white">
          Trở lại trang Mã giảm giá
        </Link>
        <h2 className="content-title">Thông tin Mã giảm giá</h2>
        <div>
          <Link to={"#"} className="btn btn-primary">
            Lưu thay đổi
          </Link>
        </div>
      </div>
      <div className="card mb-4 shadow-sm" style={{" min-width":"700px"}}>      
        <div className="card-body">
          <div className="row">
            <Voucher voucher={{_id: id, type, name, description, isActive, expireAt}} isCU={true} />
            <div className="col-md-10 col-sm-10 col-lg-6 mb-3">
              <div className="voucher-sub-title">Thông tin</div>
              <div className=" d-flex justify-content-between">
                <div className="mb-1" style={{ "marginRight": "5px" }} >
                  <label htmlFor="voucher_id" className="form-label">
                    Mã ID
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control edit-category"
                    id="voucher_id"
                    required 
                    value={id}
                    disabled
                  />        
                </div>
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
                        type="text"
                        className="form-control"
                        placeholder="Chọn Category..."
                        required
                      />
                    </div>
                    <datalist id="category_items">
                      <option value={1}>Phí vận chuyển</option>
                      <option value={2}>Phí sản phẩm (vnđ)</option>
                      <option value={3}>Phí sản phẩm (%)</option>
                    </datalist>
                  </div>
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
                    id="voucher_active"
                    value={isActive}
                    onChange={(e) => setIsActive(!isActive)}
                    required
                  ></input>
                  <div>
                    
                  </div>
                  {!isActive ? <button className="btn btn-success" onClick={() => setIsActive(!isActive)}>Kích hoạt</button>
                    : <button onClick={() => setIsActive(!isActive)} className="btn btn-danger">Hủy kích hoạt</button>}
                  
                </div>
                <div className="mb-1">
                  <label className="form-label" htmlFor="voucher_date_expire">
                    Hạn đến: <i className="voucher_expire_form">
                      {`${moment(new Date(expireAt)).format("h:m:s")} ngày ${moment(new Date(expireAt)).format("D/M/Y")}`}
                    </i>
                  </label>
                  <input
                    type={"date"}
                    placeholder="Type here"
                    className="form-control"
                    id="voucher_date_expire"
                    value={(expireAt)}
                    onChange={(e) => setExpireAt(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>          
      </div>
    </section>
  )
}

export default VoucherEditMain