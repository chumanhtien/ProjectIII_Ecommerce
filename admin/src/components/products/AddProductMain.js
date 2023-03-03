import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast"

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const AddProductMain = () => {

  const categoryList = useSelector((state) => state.categoryList);
  const {loading : loadingCategory,  error : errorCategory, categories} = categoryList;
  // console.log(categories)
  const [category, setCategory] = useState("");
  console.log("categoty: ", category);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // console.log(description)
  

  //Shoes
  const [origin, setOrigin] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [sizes, setSizes] = useState([]);
  const [sizesText, setSizesText] = useState("");

  //Mobiles
  const [screen, setScreen] = useState("");
  const [os, setOs] = useState("");
  const [cameraFront, setCameraFront] = useState("");
  const [cameraBack, setCameraBack] = useState("");
  const [chip, setChip] = useState("");
  const [ram, setRam] = useState(0);
  const [rom, setRom] = useState(0);
  const [sim, setSim] = useState("");
  const [pinCharge, setPinCharge] = useState("");

  //Manclothes
  const [colors, setColors] = useState([]);
  const [colorsText, setColorsText] = useState("");
  const [imagesList, setImagesList] = useState([]);
  const [imageText, setImageText] = useState("");

  //Toys
  const [size, setSize] = useState("");
  const [applicationAge, setApplicationAge] = useState("");

  //Babymom
  const [manual, setManual] = useState("");

  

  // console.log(sizes);


  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const {loading, error, product} = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Thêm sản phẩm thành công!", ToastObjects);
      dispatch({type: PRODUCT_CREATE_RESET});
      setName("");
      setPrice(0);
      setDescription("");
      setCountInStock(0);
      setImage(""); 

      //shoes
      if (category === 'shoes') {
        setOrigin("");
        setBrand("");
        setMaterial("");
        setSizes([]);
        setSizesText("");
      } else if (category === 'mobiles') {
        setScreen("");
        setOs("");
        setCameraFront("");
        setCameraBack("");
        setChip("");
        setRam(0);
        setRom(0);
        setSim("");
        setPinCharge("");
      } else if (category === 'manclothes') {
        setOrigin("");
        setBrand("");
        setMaterial("");
        setSizes([]);
        setSizesText("");
        setColors([]);
        setColorsText("");
        setImageText("");
        setImagesList([]);
      } else if (category === 'toys') {
        setOrigin("");
        setMaterial("");
        setSize("");
        setApplicationAge("");
      } else if (category === 'babymom') {
        setOrigin("");
        setBrand("");
        setManual("");
      }
      
    }
  }, [product, dispatch, category]);

  const submitHandler = (e, category) => {
    e.preventDefault();
    if (category) {
      let productInfoDetail = {};
      if (category === 'shoes') {
        productInfoDetail = {
          origin,
          brand,
          material,
          sizes,
        }
      } else if (category === 'mobiles') {
        productInfoDetail = {
          screen,
          os,
          chip,
          camera_front: cameraFront,
          camera_back: cameraBack,
          RAM: ram,
          ROM: rom,
          SIM: sim,
          pin_charge: pinCharge,
        }
      } else if (category === 'manclothes') {
        productInfoDetail = {
          origin,
          brand,
          material,
          sizes,
          colors,
          images_list: imagesList
        }
      } else if (category === 'toys') {
        productInfoDetail = {
          origin,
          material,
          size,
          applicationAge,
        }
      } else if (category === 'babymom') {
        productInfoDetail = {
          origin,
          brand,
          manual
        }
      }
      dispatch(createProduct({
        category,
        name, 
        image, 
        description, 
        productInfoDetail,   
        price, 
        countInStock
      }))
    }
  }
  
  return (
    <>
    <Toast/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={(e) => submitHandler(e, category)}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Trở lại trang Sản phẩm
            </Link>
            <h2 className="content-title">Thêm sản phẩm</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Xác nhận Thêm
              </button>
            </div>
          </div>

          <div className="row mb-3 f-flex justify-content-center">
            <div className="col-xl-11 col-lg-11">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  {error && <Message variant={"alert-danger"}>{error}</Message>}
                  {loading && <Loading/>}
                  <div className="mb-3 d-flex flex-row justify-content-between">
                    <div className="col-lg-5">
                      <label htmlFor="product_category" className="form-label">
                        Category
                      </label>
                      <div>
                        <form 
                          className="searchform" 
                          onChange={(e) => {
                            setCategory(e.target.value);
                            setName("");
                            setPrice(0);
                            setDescription("");
                            setCountInStock(0);
                            setImage(""); 
                          }}>
                          <div className="input-group">
                            <input
                              list="category_items"
                              type="text"
                              className="form-control"
                              placeholder="Chọn Category..."
                            />
                            {/* <button className="btn btn-light bg" type="button">
                              <i className="far fa-search"></i>
                            </button> */}
                          </div>
                          {loadingCategory ? <Loading/> : errorCategory ? <Message variant={"alert-danger"}>{errorCategory}</Message> : (
                            <datalist id="category_items">
                              {categories.map((categoryItem) => (
                                <option value={categoryItem.name}>{categoryItem.mapName}</option>
                              ))}
                              
                            </datalist>
                          )}
                        </form>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <label htmlFor="product_title" className="form-label">
                        Tên sản phẩm
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        id="product_title"
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                      />
                    </div>
                  </div>

                  <div className="mb-3 d-flex flex-row justify-content-between">
                    <div className="col-lg-5">
                      <label htmlFor="product_price" className="form-label">
                        Giá (Ngàn đồng)
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="col-lg-5">
                      <label htmlFor="product_countinstock" className="form-label">
                        Số lượng trong kho
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="form-control"
                        id="product_countinstock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                      />
                    </div>
                  </div> 
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product_description">Mô tả</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      id="product_description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="product_image">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      id="product_image"
                      placeholder="Inter Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                    <input className="form-control mt-3" type="file" value={imageText} onChange={(e) => console.log(e.target.value)} />
                  </div>
                  
                  {/* Shoes */}
                  {category && category === 'shoes' && (
                    <>
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_origin" className="form-label">
                            Xuất xứ
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required 
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_brand" className="form-label">
                            Thương hiệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_material" className="form-label">
                            Chất liệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_material"
                            required
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_sizes" className="form-label">
                            Các kích thước
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_sizes"
                            value={sizesText}
                            onChange={(e) => {
                              console.log(e.target.value.trim().split(" ")); 
                              setSizesText(e.target.value); 
                              setSizes(e.target.value.trim().split(" "));
                            }}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mobiles */}
                  {category && category === 'mobiles' && (
                    <>
                      <div className="mb-3">
                          <label htmlFor="product_screen" className="form-label">
                            Màn hình
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_screen"
                            value={screen}
                            onChange={(e) => setScreen(e.target.value)}
                            required 
                          />
                      </div>
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_os" className="form-label">
                            Hệ điều hành
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_os"
                            value={os}
                            onChange={(e) => setOs(e.target.value)}
                            required 
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_chip" className="form-label">
                            Chip xử lý
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_chip"
                            value={chip}
                            onChange={(e) => setChip(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_camera_front" className="form-label">
                            Camera trước
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_material"
                            required
                            value={cameraFront}
                            onChange={(e) => setCameraFront(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_camera_back" className="form-label">
                            Camera sau
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_sizes"
                            value={cameraBack}
                            onChange={(e) => {
                              // console.log(e.target.value.trim().split(" ")); 
                              // setSizesText(e.target.value); 
                              setCameraBack(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_ram" className="form-label">
                            RAM (GB)
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_ram"
                            required
                            value={ram}
                            onChange={(e) => setRam(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_rom" className="form-label">
                            ROM (GB)
                          </label>
                          <input
                            type="number"
                            placeholder="Type here"
                            className="form-control"
                            id="product_rom"
                            value={rom}
                            onChange={(e) => {
                              // console.log(e.target.value.trim().split(" ")); 
                              // setSizesText(e.target.value); 
                              setRom(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_sim" className="form-label">
                            SIM
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_material"
                            required
                            value={sim}
                            onChange={(e) => setSim(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_camera_back" className="form-label">
                            Pin, Sạc
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_sizes"
                            value={pinCharge}
                            onChange={(e) => {
                              // console.log(e.target.value.trim().split(" ")); 
                              // setSizesText(e.target.value); 
                              setPinCharge(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      
                    
                    </>
                  )}

                  {/* Manclothes */}
                  {category && category === 'manclothes' && (
                    <>
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_origin" className="form-label">
                            Xuất xứ
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required 
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_brand" className="form-label">
                            Thương hiệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_material" className="form-label">
                            Chất liệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_material"
                            required
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_sizes" className="form-label">
                            Các kích thước
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_sizes"
                            value={sizesText}
                            onChange={(e) => {
                              console.log(e.target.value.trim().split(" ")); 
                              setSizesText(e.target.value); 
                              setSizes(e.target.value.trim().split(" "));
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="product_sizes" className="form-label">
                          Các màu sắc
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_sizes"
                          value={colorsText}
                          onChange={(e) => {
                            console.log(e.target.value.trim().split(" ")); 
                            setColorsText(e.target.value); 
                            setColors(e.target.value.trim().split(" "));
                          }}
                          required
                          />
                      </div>

                      <div className="mb-3 d-flex flex-column">
                        <div style={{"margin-bottom": "5px"}}>
                          Danh sách hình ảnh
                        </div>
                        <div className="col-lg-12 d-flex flex-column">
                          {colors && colors[0] !== '' && colors.map((colorItem, index) => (
                            <div className="mb-2 d-flex flex-row">
                              <label htmlFor={"product_color_image" + index} className="form-label label-color">
                                {colorItem}
                              </label>
                              <div className="d-flex flex-column" style={{"width": "100%"}}>
                                <input 
                                  type="text"
                                  placeholder="Type here"
                                  className="form-control"
                                  id={"product_color_image" + index}
                                  // required
                                  // value={imageText}
                                  onChange={(e) => {
                                    // setImageText(e.target.value)
                                    imagesList[index] = e.target.value;
                                    console.log("imagesList: ", imagesList);
                                    setImagesList(imagesList);
                                    
                                  }}
                                />
                                <input className="form-control mt-3" type="file" />
                              </div>
                              
                            </div>
                          ))}
                          
                        </div>

                        {/* <div className="col-lg-5">
                          <label htmlFor="product_sizes" className="form-label">
                            Các kích thước
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_sizes"
                            value={sizesText}
                            onChange={(e) => {
                              console.log(e.target.value.trim().split(" ")); 
                              setSizesText(e.target.value); 
                              setSizes(e.target.value.trim().split(" "));
                            }}
                            required
                          />
                        </div> */}
                      </div>
                    </>
                  )}

                  {/* Toys */}
                  {category && category === 'toys' && (
                    <>
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_origin" className="form-label">
                            Xuất xứ
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required 
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_material" className="form-label">
                            Chất liệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_size" className="form-label">
                            Kích thước
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_size"
                            required
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_application_age" className="form-label">
                            Khuyến nghị độ tuổi
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_application_age"
                            value={applicationAge}
                            onChange={(e) => {
                              setApplicationAge(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )} 

                  {/* Babymom */}
                  {category && category === 'babymom' && (
                    <>
                      <div className="mb-3 d-flex flex-row justify-content-between">
                        <div className="col-lg-5">
                          <label htmlFor="product_origin" className="form-label">
                            Xuất xứ
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required 
                          />
                        </div>

                        <div className="col-lg-5">
                          <label htmlFor="product_brand" className="form-label">
                            Thương hiệu
                          </label>
                          <input
                            type="text"
                            placeholder="Type here"
                            className="form-control"
                            id="product_brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label" htmlFor="product_manual">Hướng dẫn sử dụng</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          id="product_manual"
                          value={manual}
                          onChange={(e) => setManual(e.target.value)}
                          required
                        ></textarea>
                      </div>
                  </>
                  )} 

                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
