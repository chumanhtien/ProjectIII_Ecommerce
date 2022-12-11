import React from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
// import { useDispatch, useSelector } from "react-redux";
// import { getListCategories } from "../../Redux/Actions/ProductActions";

const MainCategories = () => {
  // const dispatch = useDispatch();
  // const categoryList = useSelector((state) => state.categoryList);
  // const {loading, error, categories} = categoryList;
  // useEffect(() => {
  //   dispatch(getListCategories());
  // }, [dispatch])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory />
            {/* Categories table */}
            <CategoriesTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
