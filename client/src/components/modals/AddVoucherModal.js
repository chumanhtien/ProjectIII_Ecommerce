import { useState } from "react";
import "./Modal.css"

const AddVoucherModal = ({showModal, setShowModal}) => {

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  return (
    <div class="modal-container">
      <div className="modal-body-wrap">
        <div className="text-center mt-sm-4">
          Thêm mã giảm giá
        </div>
        <div style={{height: "75%"}}>

        </div>
        <div className="d-flex flex-row justify-content-around">
          <button onClick={() => toggleModal()} className="btn btn-success">Xác nhận</button>
          <button onClick={() => toggleModal()} className="btn btn-danger">Hủy</button>
        </div>
      </div>
    </div>
  )
}

export default AddVoucherModal;