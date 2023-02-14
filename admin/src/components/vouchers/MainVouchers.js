import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Home/Pagination";
import Voucher from "./Voucher";


const listVouchers = [
  {
    _id: '001',
    name: 'Miễn phí vẫn chuyển',
    type: 1,
    description: 'Miễn phí vận chuyển (Lên tới 20k)',
    discount: 20,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '002',
    name: 'Giảm giá 50k',
    type: 3,
    description: 'Giảm giá 50k cho đơn hàng từ 500k trở lên',
    discount: 20,
    maxValue: 30,
    minValueOfOrderRequire: 500,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '003',
    name: 'Giảm giá 30k',
    type: 3,
    description: 'Giảm giá 30k cho đơn hàng của bạn',
    discount: 30,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '004',
    name: 'Giảm giá 50k',
    type: 3,
    description: 'Giảm giá 50k cho đơn hàng của bạn',
    discount: 50,
    maxValue: -1,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*1000
  },
  {
    _id: '005',
    name: 'Giảm giá 10%',
    type: 2,
    description: 'Giảm giá 10% cho đơn hàng của bạn, tối đa 50k',
    discount: 10,
    maxValue: 50,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 100*3600*24*1000
  },
  {
    _id: '006',
    name: 'Giảm giá 5%',
    type: 2,
    description: 'Giảm giá 5% cho đơn hàng của bạn, tối đa 40k',
    discount: 5,
    maxValue: 50,
    minValueOfOrderRequire: -1,
    isActive: false,
    expireAt: Date.now() + 1*3600*24*10000
  }
]

const MainVouchers = () => {
  const [sortBy, setSortBy] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
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
                  // onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button className="btn btn-light bg" type="button" onClick={submitHandler}>
                    {/* <i className="far fa-search"></i> */}
                    <FontAwesomeIcon className="icon" icon={solid('search')} />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                <option value={0}>Type</option>
                <option value={1}>Ship</option>
                <option value={2}>Sản phẩm (%)</option>
                <option value={3}>Sản phẩm (vnđ)</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                <option value={0}>Trạng thái</option>
                <option value={1}>Kích hoạt</option>
                <option value={2}>Chưa kích hoạt</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" onChange={(e) => setSortBy(e.target.value)}>
                <option value={""}>Sắp xếp</option>
                <option value={""}>Mới nhất</option>
                <option value={""}>Cũ nhất</option>
                <option value={""}>Giá trị nhất</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="row">
            {listVouchers ? listVouchers.map((voucher, index) => (
              <Voucher voucher={voucher} key={index} />
            )) : <></>}
          </div>
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <Pagination pages={6} page={2} pathName={'vouchers'} />
            </ul>
          </nav>
        </div>

      </div>
    </section>
  )
}

export default MainVouchers