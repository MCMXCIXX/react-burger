import React, {useEffect} from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import MainColumns from "./components/MainColumns/MainColumns";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import UiMessage from "./components/UiMessage/UiMessage";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./components/Modal/Modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {HomePage} from "./pages/HomePage/HomePage";
import {FeedPage} from "./pages/FeedPage/FeedPage";
import {ProfilePage} from "./pages/Profile/ProfilePage/ProfilePage";
import {Route, Routes} from "react-router-dom";
import {OrderPage} from "./pages/OrderPage/OrderPage";
import {ProfileInfo} from "./pages/Profile/ProfileInfo/ProfileInfo";
import {ProfileOrders} from "./pages/Profile/ProfileOrders/ProfileOrders";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";


function App() {

    const {notificationMessage, isShow} = useSelector(state => state.notification)
    const dispatch = useDispatch();

    return <>

        {(notificationMessage && <UiMessage text={notificationMessage} className={isShow ? 'visible' : 'hidden'}/>)}
            <Modal/>
            <AppHeader/>


            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/feed" element={<FeedPage/>}/>
                <Route path="/profile" element={<ProfilePage />}>
                    <Route index element={<ProfileInfo />} />
                    <Route path="orders" element={<ProfileOrders />} />
                </Route>
                <Route path="/feed/:orderId" element={<OrderPage/>}/>


                <Route path="*" element={<NotFoundPage />}/>
            </Routes>

    </>
}

export default App;
