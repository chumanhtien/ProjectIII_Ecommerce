import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Message from "../../components/LoadingError/Error";
import Loading from "../../components/LoadingError/Loading";
import Sidebar from "../../components/sidebar";
import { getSingleNewsDetails } from "../../Redux/Actions/ProductActions";

const SingeNewsScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const singleNewsDetail = useSelector((state) => state.singleNewsDetail);
    const {loading, error, newInfo} = singleNewsDetail;    
    // const newInfo = {
    //     source: {
    //         id: "noibo",
    //         name: "Nội bộ"
    //     },
    //     author: "EcommerceShop",
    //     title: "Siêu Sales ngày 9.9",
    //     description: "Chào đón ngày hội mua sắm 9/9/2022\r\n Có rất nhiều mặt hàng khuyến mãi lớn đang chờ bạn…",
    //     url: "/news/noibo",
    //     urlToImage: "https://th.bing.com/th/id/OIP.I1kZjBcRXOmmuFw-XRKUigHaGk?pid=ImgDet&rs=1",
    //     content: "Siêu sales 9.9 - Đại hội mua sắm\r\n Tới đây, từ ngày 5.9.2022 đến ngày 6.9.2022, Ecommerce Shop giảm giá rất nhiều mặt hàng.\r\n Quý khách hãy vào Trang chủ và đặt những đơn hàng yêu thích với khuyến mại lớn nào!",
    //     publishedAt: "2022-06-09T16:30:25.075Z",
    // }

    useEffect(() => {
        dispatch(getSingleNewsDetails(id));
    }, [dispatch, id]);
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                {/* <div className="content-header mt-3 d-flex flex-column align-items-start" style={{"margin-left": "10px"}}>
                    <Link to="/news" className="btn btn-danger text-white ">
                        Trở lại trang Tin tức
                    </Link>
                    <h2 className="content-title d-flex flex row align-self-center">Thông tin Tin tức Nội bộ</h2>
                </div> */}
                <div className="container single-new" style={{"minHeight": "100vh"}}>
                    <div className="row new-cover align-self-center">
                        <div className="content-header mt-3 d-flex flex-column align-items-start" style={{"margin-left": "10px"}}>
                            <Link to="/news" className="btn btn-success text-white ">
                                Trở lại trang Tin tức
                            </Link>
                            <h2 className="content-title d-flex flex row align-self-center mb-2" style={{"color": "#009103"}}><b>Tin tức nội bộ</b></h2>
                        </div>
                    {loading ? <Loading/> : error ? <Message variant="alert-danger">{error}</Message> : (
                        <div className="col-md-10 new-card">
                            <div className="product-dtl">
        
                                <div className=" product-info mb-3 new-title text-center">{newInfo.title}</div>
                                
                                <div className="product-info-detail text-end mb-2">
                                    <i>{`${moment(newInfo.publishedAt).format("llll")}, Nội bộ`}</i>
                                </div>
                                <div className="new-image">
                                    <img src={newInfo.urlToImage} alt={newInfo.title} />
                                </div>
                                <div className="mb-2">
                                    <p className="product-new-line product-info-detail">{newInfo.content}</p>
                                </div>
                                <div className="text-end mb-2 new-author">
                                    <b><i>{newInfo.author}</i></b>
                                </div>
                            </div>
                    </div>
                    )}
                    
                </div>
            </div>
                
            </main>
        </>
    )
}

export default SingeNewsScreen;