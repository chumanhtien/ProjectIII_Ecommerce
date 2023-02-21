import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllVouchers } from "../../Redux/Actions/VoucherActions";
import { VOUCHER_SINGLE_DELETE_RESET } from "../../Redux/Constants/VoucherConstants";
import Pagination from "../Home/Pagination";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import Voucher from "./Voucher";

const NUMBER_VOUCHERS_PER_PAGE = 4;
const Toastobjects = {
  pasueOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000 // ms
};

// const listVouchers = [
//   {
//     _id: '001',
//     name: 'Miễn phí vẫn chuyển',
//     type: 1,
//     description: 'Miễn phí vận chuyển (Lên tới 20k)',
//     discount: 20,
//     maxValue: -1,
//     minValueOfOrderRequire: -1,
//     isActive: false,
//     expireAt: Date.now() + 1*3600*24*1000
//   },
//   {
//     _id: '002',
//     name: 'Giảm giá 50k',
//     type: 3,
//     description: 'Giảm giá 50k cho đơn hàng từ 500k trở lên',
//     discount: 20,
//     maxValue: 30,
//     minValueOfOrderRequire: 500,
//     isActive: false,
//     expireAt: Date.now() + 1*3600*24*1000
//   },
//   {
//     _id: '003',
//     name: 'Giảm giá 30k',
//     type: 3,
//     description: 'Giảm giá 30k cho đơn hàng của bạn',
//     discount: 30,
//     maxValue: -1,
//     minValueOfOrderRequire: -1,
//     isActive: false,
//     expireAt: Date.now() + 1*3600*24*1000
//   },
//   {
//     _id: '004',
//     name: 'Giảm giá 50k',
//     type: 3,
//     description: 'Giảm giá 50k cho đơn hàng của bạn',
//     discount: 50,
//     maxValue: -1,
//     minValueOfOrderRequire: -1,
//     isActive: false,
//     expireAt: Date.now() + 1*3600*24*1000
//   },
//   {
//     _id: '005',
//     name: 'Giảm giá 10%',
//     type: 2,
//     description: 'Giảm giá 10% cho đơn hàng của bạn, tối đa 50k',
//     discount: 10,
//     maxValue: 50,
//     minValueOfOrderRequire: -1,
//     isActive: false,
//     expireAt: Date.now() + 100*3600*24*1000
//   },
//   {
//     _id: '006',
//     name: 'Giảm giá 5%',
//     type: 2,
//     description: 'Giảm giá 5% cho đơn hàng của bạn, tối đa 40k',
//     discount: 5,
//     maxValue: 50,
//     minValueOfOrderRequire: -1,
//     isActive: false,
//     expireAt: Date.now() + 1*3600*24*10000
//   }
// ]

const MainVouchers = () => {

  const navigate = useNavigate()
  //pagination
  let pages = 0;
  let page = Number((useParams().pageNumber));
  if (!page)
    page = 1;
  
  //search
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  //set filters
  const [filterByType, setFilterByType] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [filterByState, setFilterByState] = useState(0);


  //get voucher in store
  const vouchersListByAdmin = useSelector((state) => state.voucherList);
  const { loading, error, success, vouchers } = vouchersListByAdmin;

  const voucherSingleDelete = useSelector((state) => state.voucherSingleDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = voucherSingleDelete;

  let voucherItems = []
  let filterState = 0;

  if (vouchers) {
    voucherItems = vouchers
    filterState = Number(filterByType * 1 + filterByState * 10);
    //filters
    switch (filterState) {
      case 1:
      case 2:
      case 3:
        voucherItems = voucherItems.filter((voucherItem) => Number(voucherItem.type) === Number(filterByType))
        break;
      case 10:
        voucherItems = voucherItems.filter((voucherItem) => voucherItem.isActive === true);
        break;
      case 20:
        voucherItems = voucherItems.filter((voucherItem) => voucherItem.isActive === false);
        break;
      case 11:
      case 12:
      case 13: 
        voucherItems = voucherItems.filter((voucherItem) => Number(voucherItem.type) === Number(filterByType) && voucherItem.isActive === true);
        break;
      case 21: 
      case 22:
      case 23:
        voucherItems = voucherItems.filter((voucherItem) => Number(voucherItem.type) === Number(filterByType) && voucherItem.isActive === false);
        break;
      default:
        voucherItems = vouchers
    }

    //sort
    switch (Number(sortBy)) {
      case 1:
        voucherItems = voucherItems.sort((a, b) => Number(moment(b.createdAt).diff(moment(a.createdAt))));
        break;
      case 2:
        voucherItems = voucherItems.sort((a, b) => Number(moment(a.createdAt).diff(moment(b.createdAt))));
        break;
      case 3:
        voucherItems = voucherItems.sort((a, b) => Number(b.discount) - Number(a.discount));
        break;
      default:
        voucherItems = voucherItems;
    }
    

    

    // voucherItems = vouchers
    //pagination
    if (voucherItems) {
      pages = voucherItems ? Math.ceil(voucherItems.length / NUMBER_VOUCHERS_PER_PAGE) : 0;
    }
  }

  if (voucherItems && page) {
    voucherItems = voucherItems.slice((page - 1) * NUMBER_VOUCHERS_PER_PAGE, page * NUMBER_VOUCHERS_PER_PAGE);
  }

  useEffect(() => {
    dispatch(getAllVouchers());
    if (successDelete) {
      toast.success("Xóa mã giảm giá thành công!", Toastobjects);
      dispatch({type: VOUCHER_SINGLE_DELETE_RESET})
    }
  }, [dispatch, success, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllVouchers(keyword));
    if (!keyword) {
      setFilterByState(0);
      setSortBy(0);
      setFilterByType(0);
    }
    navigate(keyword ? (`/vouchers/search/keyword=\'${keyword}\'`): (`/vouchers`))
  }
  return (
    <>
      <Toast/>
      <section className="content-main" style={{" min-width":"700px"}}>
        <div className="content-header">
          <h2 className="content-title">Mã giảm giá</h2>
          <div>
            <Link to={"/vouchers/add"} className="btn btn-primary">
              Thêm mới
            </Link>
          </div>
        </div>
        <div className="card mb-4 shadow-sm" style={{" min-width":"700px"}}>
          <header className="card-header bg-white">
            <div className="row gx-3 py-3">
              <div className="col-search col-lg-4 col-md-6 me-auto">
                <form className="searchform" onSubmit={submitHandler}>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Tìm kiếm"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button className="btn btn-light bg" type="button" onClick={submitHandler}>
                      {/* <i className="far fa-search"></i> */}
                      <FontAwesomeIcon className="icon" icon={solid('search')} />
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" onChange={(e) => setFilterByType(e.target.value)}>
                  <option value={0}>Type</option>
                  <option value={1}>Ship</option>
                  <option value={2}>Sản phẩm (%)</option>
                  <option value={3}>Sản phẩm (vnđ)</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" onChange={(e) => setFilterByState(e.target.value)}>
                  <option value={0}>Trạng thái</option>
                  <option value={1}>Kích hoạt</option>
                  <option value={2}>Chưa kích hoạt</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                  <option value={0}>Sắp xếp</option>
                  <option value={1}>Mới nhất</option>
                  <option value={2}>Cũ nhất</option>
                  <option value={3}>Giá trị nhất</option>
                </select>
                {/* {sortBy} */}
              </div>
            </div>
          </header>
          <div className="card-body">
            {error && (<Message variant={"alert-danger"}>{error}</Message>)}
            {errorDelete && (<Message variant={"alert-danger"}>{error}</Message>)}
            {(loading || loadingDelete) && <Loading/>}
            <div className="row">
              {voucherItems.length > 0 ? voucherItems.map((voucherItem, index) => (
                <Voucher voucher={voucherItem} key={index} />
              )) : <div className="alert alert-info text-center">Không có mã giảm giá nào tương ứng</div>}
            </div>
            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <Pagination pages={pages} page={page} keyword={keyword} pathName={'vouchers'} />
              </ul>
            </nav>
          </div>

        </div>
      </section>
    </>
  )
}

export default MainVouchers