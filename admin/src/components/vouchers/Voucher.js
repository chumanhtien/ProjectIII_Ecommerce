import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import moment from "moment"
import { useDispatch } from "react-redux"
import { deleteAVoucherByAdmin } from "../../Redux/Actions/VoucherActions"
// moment.locale('vi', {
//   months : 'Tháng Một_Tháng Hai_Tháng Ba_Tháng Tư_Tháng Năm_Tháng Sáu_Tháng Bảy_Tháng Tám_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split('_'),
//   weekdays : 'Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy_Chủ Nhật'.split('_'),
//   relativeTime : {
//       future : 'đến %s sau',
//       past : 'từ %s trước',
//       s : '%d giây',
//       m : '%d phút',
//       mm : '%d phút',
//       h : '%d giờ',
//       hh : '%d giờ',
//       d : '%d ngày',
//       dd : '%d ngày',
//       M : '%d tháng',
//       MM : '%d tháng',
//       y : '%d năm',
//       yy : '%d năm'
//   }
// });


const Voucher = (props) => {
  const { voucher, isCU } = props;
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("Bạn có muốn Xóa mã giảm giá này không?")) {
      dispatch(deleteAVoucherByAdmin(id));
    }
  }
  return (
    <>
      <div className="col-md-11 col-sm-11 col-lg-6 mb-3 voucher-container">
        {isCU ? (
          <>
            <div className = "voucher-sub-title">Preview</div>
            <div className="card card-product-grid shawdow-sm" style={{ "overflow": "hidden" }}>
              <Link to={"#"} className="d-flex flex-column voucher-card" style={{ "text-decoration": "none" }}>
                <div className="d-flex flex-row h-100 voucher-body">
                  {Number(voucher.type) === 1 ?
                    (<div className="p-2 col-3 d-flex text-center align-items-center voucher-left-header ship">Shipping Voucher</div>)
                    :
                    (<div className="p-2 col-3 d-flex text-center align-items-center voucher-left-header discount">T-Ecommerce Voucher</div>)}
                    
                  <div className="p-1 h-100 col-7">
                    <div className="p-1 h-80 text-info">
                      <div title={voucher._id} className="voucher-id">Mã: {voucher._id ? voucher._id : 'ID mã giảm giá'}</div>
                      <div title={voucher.name} className="voucher-name">{voucher.name ? voucher.name : "Tên"}</div>
                      <div className="voucher-description">{voucher.description ? voucher.description : "Mô tả"}</div>
                      <div className="voucher-expire">Hạn đến: {voucher?.expireAt ? `${moment(new Date(voucher.expireAt)).format("h:m:s")} ngày ${moment(new Date(voucher.expireAt)).format("D/M/Y")}` : ''}</div></div>
                    <div className="d-flex flex-column h-20">
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
                    </div>
                  </div>
                  <div className="p-2 col-2 d-flex flex-column justify-content-evenly action">
                    <Link
                      to={`#`}
                      className="btn btn-sm btn-outline-success p-1 pb-2"
                    >
                      <FontAwesomeIcon className="icon" icon={solid('eye')} />
                    </Link>
                    <Link
                      to="#"
                      // onClick={() => console.log("Delete voucher")}
                      className="btn btn-sm btn-outline-danger p-1 pb-2"
                    >
                      <FontAwesomeIcon className="icon" icon={solid('trash')} />
                    </Link>
                  </div>
                    
                </div>
              </Link>
              {/* <div className="info-wrap">
                  <Link to={"#"}>
                    <div className="title text-truncate">
                      {voucher.name}
                    </div>
                  </Link>
                </div> */}
            </div>
          </>
        ) : (
          <>
            <div className="card card-product-grid shawdow-sm" style={{ "overflow": "hidden" }}>
              <Link to={"#"} className="d-flex flex-column voucher-card" style={{ "text-decoration": "none" }}>
                <div className="d-flex flex-row h-100">
                  {Number(voucher.type) === 1 ?
                    (<div className="p-2 col-3 d-flex text-center align-items-center voucher-left-header ship">Shipping Voucher</div>)
                    :
                    (<div className="p-2 col-3 d-flex text-center align-items-center voucher-left-header discount">T-Ecommerce Voucher</div>)}
                    
                  <div className="p-1 h-100 col-7">
                    <div className="p-1 h-80 text-info">
                      <div title={voucher._id} className="voucher-id">Mã: {voucher._id}</div>
                      <div title={voucher.name} className="voucher-name">{voucher.name}</div>
                      <div className="voucher-description">{voucher.description}</div>
                      <div className="voucher-expire">{`Hạn đến: ${moment(new Date(voucher.expireAt)).format("h:m:s")} ngày ${moment(new Date(voucher.expireAt)).format("D/M/Y")}`}</div></div>
                    <div className="d-flex flex-column h-20">
                      <div className="d-flex flex-row justify-content-evenly">
                        {!voucher.isActive ?
                          <button
                            onClick={() => console.log("active")}
                            className="btn btn-success col-9">
                            <span>KÍCH HOẠT</span>
                          </button> :
                          <span
                            onClick={() => console.log("active")}
                            className="btn btn-danger col-9">
                            <span>HỦY KÍCH HOẠT</span>
                          </span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 col-2 d-flex flex-column justify-content-evenly action">
                    <Link
                      to={`/vouchers/${voucher._id}/edit`}
                      className="btn btn-sm btn-outline-success p-1 pb-2"
                    >
                      <FontAwesomeIcon className="icon" icon={solid('eye')} />
                    </Link>
                    <Link
                      to="#"
                      onClick={() => deleteHandler(voucher._id)}
                      className="btn btn-sm btn-outline-danger p-1 pb-2"
                    >
                      <FontAwesomeIcon className="icon" icon={solid('trash')} />
                    </Link>
                  </div>
                    
                </div>
              </Link>
            </div>    
          </>
        )
        }
      </div>
    </>
  )
}

export default Voucher