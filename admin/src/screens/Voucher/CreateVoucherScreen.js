import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import VoucherCreateMain from "../../components/vouchers/VoucherCreateMain";
const CreateVoucherScreen = () => {
  // const productId = products.find((p) => p._id === match.params.id);
  // const {id, category} = useParams();
  // console.log("id: ", id);
  // console.log("category: ", category);
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <VoucherCreateMain/>
      </main>
    </>
  );
};
export default CreateVoucherScreen;
