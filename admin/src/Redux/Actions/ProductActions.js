import axios from "axios";
import { NEW_SINGLE_DETAIL_FAIL, NEW_SINGLE_DETAIL_REQUEST, NEW_SINGLE_DETAIL_SUCCESS, PRODUCT_ADMIN_ADD_CATEGORY_FAIL, PRODUCT_ADMIN_ADD_CATEGORY_REQUEST, PRODUCT_ADMIN_ADD_CATEGORY_SUCCESS, PRODUCT_ADMIN_ADD_NEWS_FAIL, PRODUCT_ADMIN_ADD_NEWS_REQUEST, PRODUCT_ADMIN_ADD_NEWS_SUCCESS, PRODUCT_ADMIN_DELETE_CATEGORY_FAIL, PRODUCT_ADMIN_DELETE_CATEGORY_REQUEST, PRODUCT_ADMIN_DELETE_CATEGORY_SUCCESS, PRODUCT_ADMIN_DELETE_NEWS_FAIL, PRODUCT_ADMIN_DELETE_NEWS_REQUEST, PRODUCT_ADMIN_DELETE_NEWS_SUCCESS, PRODUCT_ADMIN_EDIT_CATEGORY_FAIL, PRODUCT_ADMIN_EDIT_CATEGORY_REQUEST, PRODUCT_ADMIN_EDIT_CATEGORY_SUCCESS, PRODUCT_ADMIN_GET_ALL_NEWS_FAIL, PRODUCT_ADMIN_GET_ALL_NEWS_REQUEST, PRODUCT_ADMIN_GET_ALL_NEWS_SUCCESS, PRODUCT_ADMIN_GET_CATEGORY_FAIL, PRODUCT_ADMIN_GET_CATEGORY_REQUEST, PRODUCT_ADMIN_GET_CATEGORY_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_GETALL_ADMIN_FAIL, PRODUCT_GETALL_ADMIN_REQUEST, PRODUCT_GETALL_ADMIN_SUCCESS, PRODUCT_LIST_CATEGORY_FAIL, PRODUCT_LIST_CATEGORY_REQUEST, PRODUCT_LIST_CATEGORY_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants";
import { URL } from "../URL";
import { logout } from "./UserActions";

export const getAllProducts = (keyword="") => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_GETALL_ADMIN_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`${URL}/api/products/admin/all?keyword=${keyword}`, config);
        dispatch({type: PRODUCT_GETALL_ADMIN_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_GETALL_ADMIN_FAIL,
            payload: message
        });
    }
}

export const getListCategories = () => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_CATEGORY_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`${URL}/api/products/categories`, config);
        dispatch({type: PRODUCT_LIST_CATEGORY_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_LIST_CATEGORY_FAIL,
            payload: message
        });
    }
}

export const deleteAProduct = (category, id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.delete(`${URL}/api/products/delete/${category}/${id}`, config);
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        })
    }
}

//CREATE PRODUCT
export const createProduct = (
    {
        category,
        name, 
        image, 
        productInfoDetail, 
        description, 
        price, 
        countInStock
    }) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST});

        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`${URL}/api/products/${category}/create`, {
            category, 
            name, 
            image, 
            productInfoDetail, 
            description, 
            price, 
            countInStock,
        }, config);
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}

//GET SINGLE PRODUCT
export const getSingleDetails = (category, id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/${category}/${id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: message,
        })
    }

} 

//EDIT PRODUCT
export const editProduct = (category, id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_EDIT_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/${category}/${id}`);
        dispatch({type: PRODUCT_EDIT_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: message,
        })
    }

} 

//UPDATE PRODUCT
export const updateProduct = (product, category, id) => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST});

        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            `${URL}/api/products/${category}/edit/${id}`,
            product,
            config
        );

        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
        dispatch({type: PRODUCT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }

} 


//CATEGORY GET INFO BY ADMIN
export const getCategoryInfo = (id) => async(dispatch, getState) => {  
    try {
        dispatch({type: PRODUCT_ADMIN_GET_CATEGORY_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(
            `${URL}/api/products/category/${id}`, 
            config
        );
        dispatch({type: PRODUCT_ADMIN_GET_CATEGORY_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_GET_CATEGORY_FAIL,
            payload: message
        });
    }
};

// EDIT CATEGORY BY ADMIN
export const editCategoryByAdmin = (id, categoryInfoEdit) => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_EDIT_CATEGORY_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(
            `${URL}/api/products/category/${id}/edit`, 
            categoryInfoEdit,
            config
        );
        dispatch({type: PRODUCT_ADMIN_EDIT_CATEGORY_SUCCESS, payload: data});


        //DKI thanh cong => Dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } else {
            
        }
        dispatch({
            type: PRODUCT_ADMIN_EDIT_CATEGORY_FAIL,
            payload: message
        });
    }
};

// ADD CATEGORY BY ADMIN
export const addCategoryByAdmin = ({name, mapName, description, iconImage}) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_ADD_CATEGORY_REQUEST});

        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`${URL}/api/products/category/add`, {
            name, 
            mapName,
            description,
            iconImage
        }, config);
        dispatch({type: PRODUCT_ADMIN_ADD_CATEGORY_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_ADD_CATEGORY_FAIL,
            payload: message,
        })
    }
}

//DELETE CATGEGORY BY ID BY ADMIN
export const deleteCategoryByAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_DELETE_CATEGORY_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.delete(`${URL}/api/products/category/${id}/delete`, config);
        dispatch({type: PRODUCT_ADMIN_DELETE_CATEGORY_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_DELETE_CATEGORY_FAIL,
            payload: message,
        })
    }
}

//GET ALL NEWS
export const getALLNews = (keyword="") => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_GET_ALL_NEWS_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(`${URL}/api/products/admin/news?keyword=${keyword}`, config);
        dispatch({type: PRODUCT_ADMIN_GET_ALL_NEWS_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_GET_ALL_NEWS_FAIL,
            payload: message
        });
    }
}

// ADD NEWS BY ADMIN
export const addANewsByAdmin = (
    {
        source, 
        title, 
        author, 
        url,
        urlToImage,
        description,
        content,
    }) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_ADD_NEWS_REQUEST});

        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`${URL}/api/products/news/add`, {
            source, 
            title, 
            author, 
            url,
            urlToImage,
            description,
            content,
        }, config);
        dispatch({type: PRODUCT_ADMIN_ADD_NEWS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_ADD_NEWS_FAIL,
            payload: message,
        })
    }
}

//DELETE A NEWS BY ADMIN
export const deleteANews = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_ADMIN_DELETE_NEWS_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.delete(`${URL}/api/products/news/${id}/delete`, config);
        dispatch({type: PRODUCT_ADMIN_DELETE_NEWS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: PRODUCT_ADMIN_DELETE_NEWS_FAIL,
            payload: message,
        })
    }
}


//GET SINGLE NEW
export const getSingleNewsDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: NEW_SINGLE_DETAIL_REQUEST});
        const {data} = await axios.get(`${URL}/api/products/news/${id}`);
        dispatch({type: NEW_SINGLE_DETAIL_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: NEW_SINGLE_DETAIL_FAIL,
            payload: message,
        })
    }

} 