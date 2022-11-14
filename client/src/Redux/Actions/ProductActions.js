import axios from "axios";
import { BABYMOM_LIST_FAIL, BABYMOM_LIST_REQUEST, BABYMOM_LIST_SUCCESS, MANCLOTHES_LIST_FAIL, MANCLOTHES_LIST_REQUEST, MANCLOTHES_LIST_SUCCESS, MOBILES_LIST_FAIL, MOBILES_LIST_REQUEST, MOBILES_LIST_SUCCESS, NEWS_LIST_FAIL, NEWS_LIST_REQUEST, NEWS_LIST_SUCCESS, NEW_SINGLE_DETAIL_FAIL, NEW_SINGLE_DETAIL_REQUEST, NEW_SINGLE_DETAIL_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_GET_ALL_FAIL, PRODUCT_GET_ALL_REQUEST, PRODUCT_GET_ALL_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SINGLE_DETAIL_FAIL, PRODUCT_SINGLE_DETAIL_REQUEST, PRODUCT_SINGLE_DETAIL_SUCCESS, SHOES_LIST_FAIL, SHOES_LIST_REQUEST, SHOES_LIST_SUCCESS, TOYS_LIST_FAIL, TOYS_LIST_REQUEST, TOYS_LIST_SUCCESS } from "../Constants/ProductConstants";
import { URL } from "../URL";
import { logout } from "./UserActions";


//GET ALL PRODUCTS
export const getAllProducts = (keyword="", pageNumber = "") => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_GET_ALL_REQUEST});
        const {data} = await axios.get(`${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);   
        dispatch({type: PRODUCT_GET_ALL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: PRODUCT_GET_ALL_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
};

export const listShoes = (keyword="", pageNumber = "") => async(dispatch) => {
    try {
        dispatch({type: SHOES_LIST_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/shoes?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);   
        dispatch({type: SHOES_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: SHOES_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
};

export const listMobiles = (keyword = "", pageNumber="") => async(dispatch) => {
    try {
        dispatch({type: MOBILES_LIST_REQUEST});
    
        const {data} = await axios.get(`${URL}/api/products/mobiles?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);
        dispatch({type: MOBILES_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: MOBILES_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
};

export const listManClothes = (keyword = "", pageNumber="") => async(dispatch) => {
    try {
        dispatch({type: MANCLOTHES_LIST_REQUEST});
    
        const {data} = await axios.get(`${URL}/api/products/manclothes?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);
        dispatch({type: MANCLOTHES_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: MANCLOTHES_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
}; 

//GET ALL TOYS PRODUCTS
export const listToys = (keyword = "", pageNumber="") => async(dispatch) => {
    try {
        dispatch({type: TOYS_LIST_REQUEST});
    
        const {data} = await axios.get(`${URL}/api/products/toys?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);
        dispatch({type: TOYS_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: TOYS_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
}; 

//GET ALL BABYMOM PRODUCTS
export const listBabymom = (keyword = "", pageNumber="") => async(dispatch) => {
    try {
        dispatch({type: BABYMOM_LIST_REQUEST});
    
        const {data} = await axios.get(`${URL}/api/products/babymom?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data);
        dispatch({type: BABYMOM_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: BABYMOM_LIST_FAIL,
            payload: 
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });    
    }
}; 

//SINGLE PRODUCT DETAILS
export const getSingleProductDetails = (id, category) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_SINGLE_DETAIL_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/${category}/${id}`);
        dispatch({type: PRODUCT_SINGLE_DETAIL_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: PRODUCT_SINGLE_DETAIL_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });        
    }
}

//PRODUCT CREATE REVIEW
export const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 
        const {data} = await axios.post(
            `${URL}/api/products/${productId}/review`,
            review,
            config
        );
        dispatch( {type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data});

    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}

// export const listProducts = (category) => async(dispatch) => {
//     try {
//         dispatch({type: PRODUCT_LIST_REQUEST});
//         const {data} = await axios.get(`/api/products/${category}`);
//         console.log(data);
//         dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_LIST_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ? error.response.data.message
//                 : error.message,
//         });    
//     }
// };

export const getListCategories = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_CATEGORY_REQUEST});
        // const {
        //     userLogin: {userInfo},
        // } = getState();

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        const {data} = await axios.get(`${URL}/api/products/categories`);
        dispatch({type: PRODUCT_LIST_CATEGORY_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        dispatch({
            type: PRODUCT_LIST_CATEGORY_FAIL,
            payload: message
        });
    }
}

//GET ALL NEWS
export const getListNews = (keyword = "") => async (dispatch) => {
    try {
        dispatch({type: NEWS_LIST_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/news?keyword=${keyword}`);
        dispatch({type: NEWS_LIST_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: message
        });
    }
}

//SINGLE NEW DETAILS
export const getSingleNewDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: NEW_SINGLE_DETAIL_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/news/${id}`);
        dispatch({type: NEW_SINGLE_DETAIL_SUCCESS, payload: data});

    } catch (error) {
        dispatch({
            type: NEW_SINGLE_DETAIL_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });        
    }
}