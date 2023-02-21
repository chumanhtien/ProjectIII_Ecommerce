import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import VoucherEditMain from "../../components/vouchers/VoucherEditMain";

const EditVoucherScreen = () => {
  // const productId = products.find((p) => p._id === match.params.id);
  const {id} = useParams();
  // console.log("id: ", id, category);
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <VoucherEditMain id={id}/>
      </main>
    </>
  );
};
export default EditVoucherScreen;
