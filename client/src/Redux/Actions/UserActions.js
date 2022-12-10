import axios from "axios";
import { CART_SAVE_FROM_DB } from "../Constants/CartConstants";
import { ORDER_GET_ALL_USER_ORDER_RESET } from "../Constants/OrderConstants";
import { USER_INFO_FAIL, USER_INFO_REQUEST, USER_INFO_RESET, USER_INFO_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../Constants/UserConstants"
import { URL } from "../URL";

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});

        const config = {
            headers : {
                "Content-Type": "application/json",
            },
        }
        const {data} = await axios.post(
            `${URL}/api/users/login`,
            {email, password},
            config
        );
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

//LOGOUT
export const logout = () => async (dispatch, getState) => {
    const { userLogin: { userInfo }
    } = getState();
    const userID = userInfo._id
    //save cart to db
    const { cart: {cartItems}
    } = getState()
    // console.log(cartItems)
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    }; 
    await axios.post(
        `${URL}/api/cart/save`,
        {
            userID,
            cartItems
        },
        config
    )

    localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems")
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_INFO_RESET});
    dispatch({type: ORDER_GET_ALL_USER_ORDER_RESET});
    // optional 
    document.location.href = "/";
}

//REGISTER
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});

        const config = {
            headers : {
                "Content-Type": "application/json",
            },
        }
        const {data} = await axios.post(
            `${URL}/api/users/register`,
            {name, email, password},
            config
        );
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});

        //optional: Dang ky xong dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

// USER INFO
export const getUserInfo = () => async (dispatch, getState) => {
    try {
        dispatch({type: USER_INFO_REQUEST});
        const {
            userLogin: { userInfo }, 
        } = getState();

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.get(
            `${URL}/api/users/profile`,
            config
        );
        dispatch({type: USER_INFO_SUCCESS, payload: data});
        // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_INFO_FAIL,
            payload: message
                
        })
    }
}

//UDPATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.put(`${URL}/api/users/updateprofile`, user, config);
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message
                
        })
    }
} 