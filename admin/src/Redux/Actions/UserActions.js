import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_BLOCKED_REQUEST,
    USER_BLOCKED_SUCCESS,
    USER_BLOCKED_FAIL,
    USER_UNBLOCKED_REQUEST,
    USER_UNBLOCKED_SUCCESS,
    USER_UNBLOCKED_FAIL,
    USER_ADMIN_GET_USER_REQUEST,
    USER_ADMIN_GET_USER_SUCCESS,
    USER_ADMIN_GET_USER_FAIL,
    USER_ADMIN_GET_USER_RESET,
    USER_ADMIN_EDIT_USER_REQUEST,
    USER_ADMIN_EDIT_USER_SUCCESS,
    USER_ADMIN_EDIT_USER_FAIL,
    USER_ADMIN_EDIT_USER_RESET,
    USER_ADMIN_ADD_USER_REQUEST,
    USER_ADMIN_ADD_USER_SUCCESS,
    USER_ADMIN_ADD_USER_FAIL,
    USER_ADMIN_DELETE_USER_REQUEST,
    USER_ADMIN_DELETE_USER_SUCCESS,
    USER_ADMIN_DELETE_USER_FAIL,
    ADMIN_UPDATE_PROFILE_SUCCESS,
    ADMIN_UPDATE_PROFILE_REQUEST,
    ADMIN_UPDATE_PROFILE_FAIL, 
} 
    from "../Constants/UserConstants";
import axios from "axios";
import { toast } from "react-toastify";
import { ORDER_ADMIN_GET_ORDERS_OF_USER_RESET } from "../Constants/OrderConstants";
import { URL } from "../URL";
 
//LOGIN
export const login = (email, password) => async(dispatch) => {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    }
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const {data} = await axios.post(
            `${URL}/api/users/login`, 
            {email, password}, 
            config
        );

        if (data.role !== 1) {
            toast.error("Bạn không phải Admin!", ToastObjects);
            dispatch({
                type: USER_LOGIN_FAIL
            })
        } else {
            dispatch({type: USER_LOGIN_SUCCESS, payload: data});  
        }

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: message
        });
    }
};

//LOGOUT 
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_LIST_RESET});
    dispatch({type: USER_ADMIN_GET_USER_RESET});
    dispatch({type: ORDER_ADMIN_GET_ORDERS_OF_USER_RESET});
    dispatch({type: USER_ADMIN_EDIT_USER_RESET})
    // document.location.href="/login";
}

//GET ALL USERS
export const listUser = (keyword="") => async(dispatch, getState) => {
    // const ToastObjects = {
    //     pauseOnFocusLoss: false,
    //     draggable: false,
    //     pauseOnHover: false,
    //     autoClose: 2000,
    // }
    try {
        dispatch({type: USER_LIST_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(
            `${URL}/api/users?keyword=${keyword}`, 
            config
        );
        dispatch({type: USER_LIST_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload: message
        });
    }
};

//USER BLOCKED
export const blockUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_BLOCKED_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            `${URL}/api/users/${id}/blocked`, 
            {}, 
            config
        );
        dispatch({type: USER_BLOCKED_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_BLOCKED_FAIL,
            payload: message
        })
        
    }
}

//USER UNBLOCKED
export const unBlockUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_UNBLOCKED_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            `${URL}/api/users/${id}/unblocked`, 
            {}, 
            config
        );
        dispatch({type: USER_UNBLOCKED_SUCCESS, payload: data});
        
    } catch (error) {
        const message = 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        if (message  === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UNBLOCKED_FAIL,
            payload: message
        })
        
    }
}

//USER GET INFO BY ADMIN
export const getUserInfo = (id) => async(dispatch, getState) => {
    
    try {
        dispatch({type: USER_ADMIN_GET_USER_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(
            `${URL}/api/users/${id}/profile`, 
            config
        );
        dispatch({type: USER_ADMIN_GET_USER_SUCCESS, payload: data});

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_ADMIN_GET_USER_FAIL,
            payload: message
        });
    }
};

//USER EDIT INFO BY ADMIN
export const editUserInfoByAdmin = (id, userInfoEdit) => async(dispatch, getState) => {
    try {
        dispatch({type: USER_ADMIN_EDIT_USER_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(
            `${URL}/api/users/${id}/editprofile`, 
            userInfoEdit,
            config
        );
        dispatch({type: USER_ADMIN_EDIT_USER_SUCCESS, payload: data});


        //DKI thanh cong => Dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } else {
            
        }
        dispatch({
            type: USER_ADMIN_EDIT_USER_FAIL,
            payload: message
        });
    }
};

//USER ADD USER BY ADMIN
export const addAnUser = ({name, email, password}) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_ADMIN_ADD_USER_REQUEST});

        const {
            userLogin: {userInfo}
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(`${URL}/api/users/admin/add`, {
            name, 
            email,
            password
        }, config);
        dispatch({type: USER_ADMIN_ADD_USER_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_ADMIN_ADD_USER_FAIL,
            payload: message,
        })
    }
}

//DELETE USER BY ID BY ADMIN
export const deleteAnUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_ADMIN_DELETE_USER_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.delete(`${URL}/api/users/${id}/delete`, config);
        dispatch({type: USER_ADMIN_DELETE_USER_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_ADMIN_DELETE_USER_FAIL,
            payload: message,
        })
    }
}


//ADMIN UPDATE PROFILE
export const updateAdminProfile = (user) => async(dispatch, getState) => {
    try {
        dispatch({type: ADMIN_UPDATE_PROFILE_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.put(
            `${URL}/api/users/updateprofile`, 
            user,
            config
        );
        dispatch({type: ADMIN_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem("userInfo", JSON.stringify(data));

        //DKI thanh cong => Dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } else {
            
        }
        dispatch({
            type: ADMIN_UPDATE_PROFILE_FAIL,
            payload: message
        });
    }
};