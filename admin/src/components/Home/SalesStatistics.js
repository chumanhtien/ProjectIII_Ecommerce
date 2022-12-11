import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê doanh thu</h5>
          <iframe 
            style={{
              "background": "#FFFFFF",
              "border": "none",
              "borderRadius": "2px",
              "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)", 
            }} 
            width="100%"
            height={"600px"}
            src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985567-840f-4bb2-819a-4500f84dd980&maxDataAge=3600&theme=light&autoRefresh=true"
          >
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
