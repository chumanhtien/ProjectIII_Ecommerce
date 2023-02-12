import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import MainNews from "../../components/news/MainNews.js";

const NewsScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainNews />
      </main>
    </>
  );
};

export default NewsScreen;
