import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategoryByAdmin, getListCategories } from "../../Redux/Actions/ProductActions";
import {  PRODUCT_ADMIN_DELETE_CATEGORY_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const Toastobjects = {
  pasueOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000 // ms
};

const CategoriesTable = (props) => {
  // const {loading, error, categories} = props;
  // const {id} = useParams();
  const dispatch = useDispatch();
 
  const categoryList = useSelector((state) => state.categoryList);
  const {loading, error, categories} = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {loading: loadingDelete, error: errorDelete, success} = categoryDelete;
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      toast.success("Bạn vừa xóa thành công Category!", Toastobjects);
      dispatch({type: PRODUCT_ADMIN_DELETE_CATEGORY_RESET});
      navigate("/category");

    }
    dispatch(getListCategories());

  }, [dispatch, success]);
  const deleteCategoryHandler = (id) => {
    if (window.confirm("Bạn có muốn xóa Category này?")) {
      dispatch(deleteCategoryByAdmin(id));
    }
  }
  return (
    <div className="col-md-12 col-lg-8">
      <Toast/>
      {loadingDelete && <Loading/>}
      {errorDelete && <Message variant={"alert-danger"}>{errorDelete}</Message>}
      <table className="table">
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Tên hiển thị</th>
            <th>Mô tả</th>
            <th className="text-end">Hành động</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {loading ? <Loading/> : error ? <Message className="alert-danger">{error}</Message> : (
            <>
              {categories.map((categoryItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <b>{categoryItem.name}</b>
                  </td>
                  <td>{categoryItem.mapName}</td>
                  <td>{categoryItem.description}</td>
                  <td className="text-end">
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        className="btn btn-light"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </Link>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item text-warning" to={`/category/${categoryItem._id}/edit`}>
                          Chỉnh sửa
                        </Link>
                        <Link 
                          onClick={() => deleteCategoryHandler(categoryItem._id)}
                          className="dropdown-item text-danger" to="#">
                          Xóa
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
            ))}
            </>
          )}
          
          
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
