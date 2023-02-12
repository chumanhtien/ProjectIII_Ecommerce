import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import OrderDetailMain from "../../components/orders/OrderDetailMain";
import { useParams } from "react-router-dom";

const OrderDetailScreen = () => {
  const {id} = useParams();
  // console.log("Order id: ", id);
  

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailMain orderId={id} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
