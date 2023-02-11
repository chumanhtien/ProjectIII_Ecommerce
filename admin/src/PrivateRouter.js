import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useSelector} from "react-redux";

const PrivateRouter = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    return (
        (userInfo && userInfo.role === 1) ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRouter;