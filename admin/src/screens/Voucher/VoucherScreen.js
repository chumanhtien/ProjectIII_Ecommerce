import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import MainVouchers from "../../components/vouchers/MainVouchers";

const VoucherScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainVouchers/>
      </main>
    </>
  )
}

export default VoucherScreen;