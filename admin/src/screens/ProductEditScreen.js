import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "./../components/products/EditproductMain";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
  // const productId = products.find((p) => p._id === match.params.id);
  const {id, category} = useParams();
  console.log("id: ", id);
  console.log("category: ", category);
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain id={id} category={category}/>
      </main>
    </>
  );
};
export default ProductEditScreen;
