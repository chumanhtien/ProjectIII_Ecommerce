import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/orders/OrderMain";
import { useParams } from "react-router-dom";

const OrderScreen = () => {
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain/>
      </main>
    </>
  );
};

export default OrderScreen;
