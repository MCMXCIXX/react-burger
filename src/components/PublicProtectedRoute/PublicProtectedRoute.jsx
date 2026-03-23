import React from 'react';
import styles from './PublicProtectedRoute.module.scss';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";


export const PublicProtectedRoute = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/profile" />;
};
