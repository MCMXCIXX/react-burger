import React from 'react';
import styles from './RootRouters.module.scss';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {HomePage} from "../../pages/HomePage/HomePage";
import {FeedPage} from "../../pages/FeedPage/FeedPage";
import {ProfilePage} from "../../pages/Profile/ProfilePage/ProfilePage";
import {ProfileInfo} from "../../pages/Profile/ProfileInfo/ProfileInfo";
import {ProfileOrders} from "../../pages/Profile/ProfileOrders/ProfileOrders";
import {OrderPage} from "../../pages/OrderPage/OrderPage";
import {NotFoundPage} from "../../pages/NotFoundPage/NotFoundPage";
import {LoginPage} from "../../pages/LoginPage/LoginPage";
import {RegisterPage} from "../../pages/RegisterPage/RegisterPage";
import {ForgotPasswordPage} from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage/ResetPasswordPage";
import {IngredientPage} from "../../pages/IngredientPage/IngredientPage";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import {PublicProtectedRoute} from "../PublicProtectedRoute/PublicProtectedRoute";
import {ResetPasswordRoute} from "../ResetPasswordRoute/ResetPasswordRoute";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";


export const RootRouters = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const background = location.state?.background;

    return (
        <div className={styles.container}>
            <Routes location={background || location} >
                <Route path="/" element={<HomePage/>}/>
                <Route path="ingredients/:ingredientId" element={<IngredientPage/>}/>
                {background && (
                    <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>} />
                )}
                <Route path="feed/:orderId" element={<OrderPage/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="profile" element={<ProfilePage/>}>
                        <Route index element={<ProfileInfo/>}/>
                        <Route path="orders" element={<ProfileOrders/>}/>
                    </Route>
                </Route>

                <Route element={<PublicProtectedRoute/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>

                    <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                </Route>

                <Route element={<ResetPasswordRoute/>} >
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                </Route>



                <Route path="feed" element={<FeedPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
};
