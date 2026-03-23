import React from 'react';
import styles from './ResetPasswordRoute.module.scss';
import {useSelector} from "react-redux";
import {Navigate, Outlet, useNavigate} from "react-router-dom";


export const ResetPasswordRoute = () => {
    const passwordResetRequested = useSelector(state => state.auth.passwordResetRequested)

    return passwordResetRequested ? <Outlet /> : <Navigate to="/forgot-password" />;
};
