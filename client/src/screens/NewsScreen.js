import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import { useParams } from "react-router";
import NewsSection from "../components/homeComponents/NewsSection";

const NewsScreen = (props) => {
  window.scrollTo(0, 0);
  const {category} = props;
  // console.log("category: ", category);
  const {keyword} = useParams();
  // console.log("Keyword", keyword);
  const {pageNumber} = useParams();
  return (
    <div>
      <Header category={category}/>
      <NewsSection category={category} keyword={keyword} pageNumber={pageNumber}/>
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default NewsScreen;