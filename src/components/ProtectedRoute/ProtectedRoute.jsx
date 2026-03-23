import React from 'react';
import styles from './ProtectedRoute.module.scss';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";


export const ProtectedRoute = () => {
    const location = useLocation();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from: location}} />;
};
