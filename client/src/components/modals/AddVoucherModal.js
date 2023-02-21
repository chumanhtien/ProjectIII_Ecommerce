import moment from "moment";
import { useState } from "react";
import "./Modal.css"

const AddVoucherModal = (props) => {

  const {listVoucher} = props 
  const { showModal, setShowModal, setVoucherID } = props;
  const [voucherChecked, setVoucherChecked] = useState("")
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const submitHandler = (id) => {
    setVoucherID(id);
    toggleModal();
  }

  // console.log(voucherChecked)
  
  return (
    <div class="modal-container">
      <div className="modal-body-wrap">
        <div className="text-center mt-sm-4 modal-title">
          Thêm mã giảm giá
        </div>
        <div className="scroll-box">
          <div className="d-flex flex-column justify-content-center align-items-center list-voucher-card ">
            {listVoucher ? listVoucher.map((voucher, index) => (
              <div className={`col-lg-12 col-md-10 col-sm-10 mt-2 voucher-card`}>
                <div className={`d-flex flex-row border-product shadow-sm ${voucher._id === voucherChecked ? "checked" : ""}`}>
                  <div className={`p-2 col-3 d-flex text-center align-items-center voucher-left-header ${voucher.type === 1 ? "ship" : "discount"}`}>{voucher.type === 1 ? "Shipping Voucher" : "T-Ecommerce Voucher"}</div>
                  <div className="p-1 h-100 col-8">
                    <div className="p-1 h-80">
                      <div className="voucher-id">Mã: {voucher._id ? voucher._id : 'ID mã giảm giá'}</div>
                      <div className="voucher-name">{voucher.name ? voucher.name : "Tên"}</div>
                      <div className="voucher-description">{voucher.description ? voucher.description : "Mô tả"}</div>
                      <div className="voucher-abs">
                        <div className="voucher-active">Trạng thái: <span >{voucher.isActive ? "Đang kích hoạt" : "Chưa kích hoạt"}</span></div>
                        <div className="voucher-expire">Hạn đến: <i>{voucher?.expireAt ? `${moment(new Date(voucher.expireAt)).format("h:m:s")} ngày ${moment(new Date(voucher.expireAt)).format("D/M/Y")}` : ''}</i></div>
                      
                      </div>
                    </div>
                    {/* <div className="d-flex flex-column h-20">
                      <div className="d-flex flex-row justify-content-evenly">
                        {!voucher.isActive ?
                          <button
                            onClick={() => console.log("active")}
                            className="btn btn-success col-9">
                            <span>KÍCH HOẠT</span>
                          </button> :
                          <button
                            onClick={() => console.log("active")}
                            className="btn btn-danger col-9">
                            <span>HỦY KÍCH HOẠT</span>
                          </button>}
                      </div>
                    </div> */}
                    
                  </div>
                  <div className="p-1 d-flex justify-content-center align-item-center">
                    <input type="radio" value={voucher._id} id="voucher" name="voucher" onChange={(e) => setVoucherChecked(e.target.value) } />
                  </div>
                </div>
              </div>
            ))
              : (
              <div className="alert alert-info text-center mt-3">Bạn không có mã giảm giá để áp dụng</div>
            )
            }
          </div>
        </div>
        
        <div className="d-flex flex-row justify-content-around mt-2">
          <button onClick={() => submitHandler(voucherChecked)} className="btn btn-success">Xác nhận</button>
          <button onClick={() => toggleModal()} className="btn btn-danger">Hủy</button>
        </div>
      </div>
    </div>
  )
}

export default AddVoucherModal;