import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
// import dtddProducts from "../../data/dtddProducts";
// import shoesProducts from "../../data/shoesProducts";
import manclothesProducts from "../../data/manclothesProducts";
import toysProducts from "../../data/toys";
import babymomProducts from "../../data/babymom";
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { getAllProducts, listBabymom, listManClothes, listMobiles, listProducts, listShoes, listToys } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { CurrencyFormatter } from "../converterComponents/CurrencyFormatter";
// import CurrencyFormat from "react-currency-format";


const ShopSection = (props) => {
  const {category} = props;
  console.log("category: ", category);
  const {keyword, pageNumber} = props;
  

  const productGetAll = useSelector((state) => state.productGetAll);
  const shoesList = useSelector((state) => state.shoesList);
  const mobilesList = useSelector((state) => state.mobilesList);
  const manClothesList = useSelector((state) => state.manClothesList);
  const toysList = useSelector((state) => state.toysList);
  const babymomList = useSelector((state) => state.babymomList);
  // const productList = useSelector((state) => state.productsList);

  const {loading: allProductLoading, error: allProductError, products: allProducts} = productGetAll;
  const {loading, error, shoesProducts} = shoesList;
  const {loading : loadingMobile, error : errorMobile, mobilesProducts} = mobilesList;
  const {loading : loadingManClothes, error : errorManClothes, manClothesProducts} = manClothesList;
  const {loading : loadingToys, error : errorToys, toysProducts} = toysList;
  const {loading : loadingBabymom, error : errorBabymom, babymomProducts} = babymomList;
 


  let page = 0, pages = 0;
  if (category) {
    if (category === 'shoes') {
      page = shoesList.page;
      pages = shoesList.pages;
      console.log("Shoes page: ", page, "/", pages);

    } else if (category === 'mobiles') {
      page = mobilesList.page;
      pages = mobilesList.pages;
      console.log("Mobiles page: ", page, "/", pages);

    } else if (category === 'manclothes') {
      page = manClothesList.page;
      pages = manClothesList.pages;
      console.log("ManClothes page: ", page, "/", pages);
    } else if (category === 'toys') {
      page = toysList.page;
      pages = toysList.pages;
      console.log("Toys page: ", page, "/", pages);
    } else if (category === 'babymom') {
      page = babymomList.page;
      pages = babymomList.pages;
      console.log("Babymom page: ", page, "/", pages);
    }

  } else {
    page = productGetAll.page;
    pages = productGetAll.pages;
    console.log("All products page: ", page, "/", pages);
  }
  


  // const {loading, error, products: allProducts} = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!category) {
      dispatch(getAllProducts(keyword, pageNumber));
    } else {
      if (category === 'shoes') {
        dispatch(listShoes(keyword, pageNumber));
      }
      else if (category === 'mobiles') {
        dispatch(listMobiles(keyword, pageNumber));
      }
      else if (category === 'manclothes') {
        dispatch(listManClothes(keyword, pageNumber));
      } 
      else if (category === 'toys') {
        dispatch(listToys(keyword, pageNumber));
      } 
      else if (category ===  'babymom') {
        dispatch(listBabymom(keyword, pageNumber));
      }
    }
      
      // dispatch(listProducts(category))
  }, [dispatch, category, keyword, pageNumber]);
  // const [shoesProducts, setShoesProducts] = useState([]);
  // const [dtddProducts, setDtddProducts] = useState([]);
  // const [manclothesProducts, setMenclothesProducts] = useState([]);
  // const [toysProducts, setToysProducts] = useState([]);
  // const [babymomProducts, setBabymomProducts] = useState([]);

  // useEffect(() => {
  //   const fetchShoesProducts = async () => {
      
  //     // const shoes = await (await axios.get("/api/products/shoes")).data;
  //     // setShoesProducts(shoes);
  //     // const mobiles = await (await axios.get("/api/products/mobiles")).data;
  //     // setDtddProducts(mobiles);
  //     // const manclothes = await (await axios.get("/api/products/manclothes")).data;
  //     // setMenclothesProducts(manclothes);
  //     const toys = await (await axios.get("/api/products/toys")).data;
  //     setToysProducts(toys);
  //     const babymoms = await (await axios.get("/api/products/babymom")).data;
  //     setBabymomProducts(babymoms);
  //     // console.log(shoes);
  //     console.log("Fetching shoes product");
  //   };
  //   fetchShoesProducts();
    
  // }, [category]); 
  let products = [];
  if (allProducts && shoesProducts && mobilesProducts) {
    if (!category) {
      if (allProducts) {
        // products = _.merge(shoesProducts, mobilesProducts);
        //  products.push(...shoesProducts);
        //  products.push(...mobilesProducts);
        products = allProducts;
        // console.log(products);
      }
    }
    else {
      if (shoesProducts && mobilesProducts && toysProducts && babymomProducts && manclothesProducts) {
        products = (category === "shoes") ? shoesProducts : (category === "mobiles") ? mobilesProducts : (category === "manclothes") ? manClothesProducts : (category === 'toys') ? toysProducts : (category === 'babymom') ? babymomProducts : shoesProducts;
      }
    }
  }
  // if (allProducts) {
  //   products = allProducts;
  // }
  // if (category==="dtdd") {
  //   products = dtddProducts;
  // }
  // else if (category==="shoes") {
  //   products = shoesProducts;
  // }
  return (
    <>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading || allProductLoading || loadingMobile ? (
                  <div className="mb-3">
                    <Loading/>
                  </div>) : error || allProductError ? <Message variant={"alert-danger"}>{error}</Message> :(<>
                  {products.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product._id}
                    >
                      <div className="border-product">
                        <Link to={`/products/${product.category}/${product._id}`}>
                          <div className="shopBack">
                            <img src={product.image} alt={product.name} />
                          </div>
                        </Link>

                        
                        <div className="shoptext">
                          <p>
                            <Link className="text_name text-truncate" title={product.name} to={`/products/${category}/${product._id}`}>
                              {product.name}
                            </Link>
                          </p>
                          {product.category==="mobiles" ? (
                          <div className="config_dtdd">
                            <div className="config_dtdd_ramrom">RAM {product.productInfoDetail.RAM}GB</div>
                            <div className="config_dtdd_ramrom">ROM {product.productInfoDetail.ROM}GB</div>
                          </div>
                          ):
                          (<></>)}
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                          />
                          <h3>{CurrencyFormatter(product.price)}</h3>
                          {/* <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h3>{value}</h3>} /> */}

                        </div>
                      </div>
                    </div>
                  ))}
                </>)}
                
                {/* Pagination */}
                <Pagination 
                  pages={pages} 
                  page={page} 
                  keyword={keyword ? keyword : ""}
                  category={category}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
