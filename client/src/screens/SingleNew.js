import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../components/LoadingError/Loading";
import { getSingleNewDetails } from "../Redux/Actions/ProductActions";
import moment from "moment"
const news = [
    {
        source: {
          id: "engadget",
          name: "Engadget"
        },
        author: "Kris Holt",
        title: "New York passes a bill to limit bitcoin mining",
        description: "New York lawmakers have passed a bill\r\n that would temporarily ban new bitcoin\r\n mining operations. Early on Friday, state senators voted 36-27 to pass the legislation. It's now bound for the desk of Governor Kathy Hochul, who will sign it into law or veto th…",
        url: "https://www.engadget.com/new-york-cryptocurrency-bill-bitcoin-mining-climate-change-161126292.html",
        urlToImage: "https://s.yimg.com/os/creatr-uploaded-images/2021-05/a8217250-bdfa-11eb-bfc4-2663225cea83",
        publishedAt: "2022-06-03T16:11:26Z",
        content: "New York lawmakers have passed a bill that would temporarily ban new bitcoin mining operations.\n Early on Friday, state senators voted 36-27 to pass the legislation.\n It's now bound for the desk of… [+2036 chars]"
    }
];
const SingleNew = () => {
  const newItem = news[0];
  const dispatch = useDispatch();
  const {id} = useParams();
  // console.log("New id: ", id);
  const singleNewDetails = useSelector((state) => state.singleNewDetails);
  const {loading, error, newInfo} = singleNewDetails;

  useEffect(() => {
    dispatch(getSingleNewDetails(id));
  }, [id])

  return (
    <>
      <Header />
      {loading ? <Loading/> : error ? <Message variant={"alert-danger"}>{error}</Message> : (
        <div className="container single-new" style={{"minHeight": "100vh"}}>
          
          <div className="row new-cover align-self-center">
            <div className="content-header mt-3 d-flex flex-column align-items-start" style={{"margin-left": "10px"}}>
              <Link to="/news" className="btn btn-success text-white ">
                  Trở lại trang Tin tức
              </Link>
              <h2 className="content-title d-flex flex row align-self-center mb-2" style={{"color": "#009103"}}><b>Tin tức nội bộ</b></h2>
            </div>
            <div className="col-md-10 new-card">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="new-title text-center">{newInfo.title}</div>
                </div>
                <div className="product-info-detail text-end">
                  <i>{`${moment(newInfo.publishedAt).format("llll")}, Nội bộ`}</i>
                </div>
                <div className="new-image">
                  <img src={newInfo.urlToImage} alt={newInfo.title} />
                </div>
                <div className="mb-2">
                  <p className="product-new-line">{newInfo.content}</p>
                </div>
                <div className="text-end mb-2" style={{"fontSize": "20px"}}>
                  <b><i>{newInfo.author}</i></b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default SingleNew;
