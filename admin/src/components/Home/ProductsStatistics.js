import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
      
        <article className="card-body">
        <h5 className="card-title">Thống kê sản phẩm</h5>
          <iframe 
            style={{
              "marginRight": "0.5%",
              "marginLeft": "0.5%",
              "marginBottom": "10px",
              "background": "#FFFFFF",
              "border": "none",
              "borderRadius": "2px",
              "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="48%" 
            height="300" 
            src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985851-d9b1-404e-86f6-f8d38c014cd2&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
          <iframe 
            style={{
              "marginRight": "5px",
              "marginLeft": "5px",
              "marginBottom": "10px",
              "background": "#FFFFFF",
              "border": "none",
              "borderRadius": "2px",
              "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="48%" 
            height="300" 
            src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985956-2ee0-4758-8e2c-c5333d54e326&maxDataAge=3600&theme=light&autoRefresh=true"
            >
          </iframe>
            
          <iframe 
            style={{
              "marginRight": "0.5%",
              "marginLeft": "0.5%",
              "marginBottom": "10px",
              "background": "#FFFFFF",
              "border": "none",
              "borderRadius": "2px",
              "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            height="300" 
            width="32%"

            src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985a49-7b9a-487e-85ba-0963224421d4&maxDataAge=3600&theme=light&autoRefresh=true"                
            >
          </iframe>
          <iframe 
            style={{
              "marginRight": "0.5%",
              "marginLeft": "0.5%",
              "marginBottom": "10px",
              "background": "#FFFFFF",
              "border": "none",
              "borderRadius": "2px",
              "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            height="300" 
            width="32%"
            src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985afd-2d74-4ad2-8247-90dc17e6e4ca&maxDataAge=3600&theme=light&autoRefresh=true"                >
          </iframe>
       
          <iframe 
              style={{
                
                "marginRight": "0.5%",
              "marginLeft": "0.5%",
                "marginBottom": "10px",
                "background": "#FFFFFF",
                "border": "none",
                "borderRadius": "2px",
                "boxShadow": "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              height="300" 
              width="32%"
              src="https://charts.mongodb.com/charts-project-ecommerce-bzalo/embed/charts?id=62985ba9-7b9a-4087-8304-0963224496a4&maxDataAge=3600&theme=light&autoRefresh=true"                >
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
