import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const {loading, error, orders} = orderList;
  const productGetAll = useSelector((state) => state.productGetAll);
  const {loading: loadingAll, error: errorAll, allProducts} = productGetAll;

  const userList = useSelector((state) => state.userList);
  const {loading: loadingUsers, error: errorUsers, users} = userList;

  const newsListByAdmin = useSelector((state) => state.newsListByAdmin);
  const {loading: loadingNewss, error: errorNews, news} = newsListByAdmin;


  
  const products = allProducts.products;
  if (products)
    console.log("products", products);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Thống kê </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} news={news} users={users}/>

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
