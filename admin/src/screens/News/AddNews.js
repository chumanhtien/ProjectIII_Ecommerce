import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import AddNewsMain from "../../components/news/AddNewsMain";

const AddNews = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddNewsMain />
      </main>
    </>
  );
};

export default AddNews;
