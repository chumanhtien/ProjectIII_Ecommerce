import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addCategoryByAdmin, editCategoryByAdmin, getCategoryInfo } from "../../Redux/Actions/ProductActions";
import { PRODUCT_ADMIN_ADD_CATEGORY_RESET, PRODUCT_ADMIN_EDIT_CATEGORY_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const Toastobjects = {
  pasueOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000 // ms
};

const CreateCategory = () => {
  const toastId = React.useRef(null);

  const {id} = useParams();
  const [name, setName] = useState("");
  const [mapName, setMapName] = useState("");
  const [description, setDescription] = useState("");
  const [iconImage, setIconImage] = useState("");

  const dispatch = useDispatch();
  const categoryAdd = useSelector((state) => state.categoryAdd);
  const {loading: loadingAdd, error: errorAdd, category: categoryAdded} = categoryAdd;


  const [nameEdit, setNameEdit] = useState("");
  const [mapNameEdit, setMapNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [iconImageEdit, setIconImageEdit] = useState("");

  
  const categoryInfoDetails = useSelector((state) => state.categoryInfoDetails);
  const {loading: loadingInfo, error: errorInfo, category: categoryInfo} = categoryInfoDetails;

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const {loading: loadingEdit, success: successEdit, error: errorEdit} = categoryEdit;

 

  // console.log(mapNameEdit, iconImageEdit, descriptionEdit)
  useEffect(() => {
    if (!id) {
      if (categoryAdded) {
        //Toast Success
        toast.success("Thêm mới Category thành công", Toastobjects);
        dispatch({type: PRODUCT_ADMIN_ADD_CATEGORY_RESET});
        setName("");
        setMapName("");
        setDescription("");
        setIconImage("");
      }
    }
    else {
      dispatch(getCategoryInfo(id));
      
      if (successEdit) {
        if(!toast.isActive(toastId.current)){ // Chi hien ra 1 Toast tai 1 thoi diem
          toastId.current = toast.success("Thông tin Category đã được thay đổi", Toastobjects);
          dispatch({type: PRODUCT_ADMIN_EDIT_CATEGORY_RESET});
        }
      }
    }
    if (categoryInfo) {
      setMapNameEdit(categoryInfo.mapName);
      setDescriptionEdit(categoryInfo.description);
      setIconImageEdit(categoryInfo.iconImage);
    }
    
}, [dispatch, categoryAdded, id, successEdit]);

  const addCategoryHandler = () => {
    dispatch(addCategoryByAdmin({
      name,
      mapName,
      iconImage,
      description,
    }))
  }

  const editCategoryHandler = () => {
    dispatch(editCategoryByAdmin(id, {
      mapName: mapNameEdit,
      iconImage: iconImageEdit,
      description: descriptionEdit,
    }));
    
  }

  console.log(descriptionEdit);

  return (
    <>
      <Toast/>
      {loadingAdd && <Loading/>}
      {errorAdd && <Message variant={"alert-danger"}>{errorAdd}</Message>}
      {!id ? (
        <div className="col-md-12 col-lg-4">
          <form> 
            <h4 className="text-center">Tạo mới Category</h4>
            <div className="mb-2">
              <label htmlFor="product_name" className="form-label">
                Tên
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-2"
                id="product_name"
                required
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="product_mapname" className="form-label">
                Tên hiển thị
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control py-2"
                id="product_mapname"
                value={mapName}
                required
                onChange={(e) => setMapName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Icon</label>
              <input className="form-control"
                placeholder="Icon link"
                value={iconImage}
                onChange={(e) => setIconImage(e.target.value)}
                type="text" />
            </div>
            <div className="mb-2">
              <label className="form-label">Mô tả</label>
              <textarea
                placeholder="Type here"
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid" onClick={addCategoryHandler}>
              <button className="btn btn-primary py-2">Thêm</button>
            </div>
          </form>
        </div>
        

      ) : (
        <> 
          <div className="col-md-12 col-lg-4">
            {loadingInfo ? <Loading/> : errorInfo ? <Message>{errorInfo}</Message> : (
              <form> 
                {loadingEdit && <Loading/>}
                {errorEdit && <Message variant={"alert-d"}>{errorEdit}</Message>}
                <h4 className="text-center">Chỉnh sửa Category</h4>
                <div className="mb-2">
                  <label 
                    
                    htmlFor="category_id" className="form-label">
                    ID
                  </label>
                  <div
                    type="text"
                    placeholder="Type here"
                    style={{"backgroundColor": "#d5e1d8"}}
                    className="form-control py-2 card-user-info"
                    id="category_id"
                    disabled
                  >{id}</div>
                </div>
                <div className="mb-2">
                  <label htmlFor="category_id" className="form-label">
                    Tên
                  </label>
                  <div
                    type="text"
                    placeholder="Type here"
                    style={{"backgroundColor": "#d5e1d8"}}
                    className="form-control py-2 card-user-info"
                    id="category_id"
                    disabled
                  ><strong>{nameEdit || categoryInfo.name}</strong></div>
                </div>
                <div className="mb-2">
                  <label htmlFor="product_name_edit" className="form-label">
                    Tên hiển thị
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control py-2"
                    id="product_name_edit"
                    value={mapNameEdit || categoryInfo.mapName}
                    onChange={(e) => {
                      setMapNameEdit(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Icon</label>
                  <input 
                    className="form-control" 
                    placeholder="Icon link" 
                    type="text" 
                    value={iconImageEdit || categoryInfo.iconImage}
                    onChange={(e) => setIconImageEdit(e.target.value)}

                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows="4"
                    value={descriptionEdit || categoryInfo.description}
                    onChange={(e) => setDescriptionEdit(e.target.value)}
                  ></textarea>
                </div>
    
                <div className="d-grid" onClick={editCategoryHandler}>
                  <button className="btn btn-primary py-2">Chỉnh sửa</button>
                </div>
              </form>
            )}
          </div>
        </>   
      )}
    
            
        

    </>
    
  );
};

export default CreateCategory;
