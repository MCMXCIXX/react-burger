import React, {useEffect} from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import MainColumns from "./components/MainColumns/MainColumns";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import UiMessage from "./components/UiMessage/UiMessage";
import {useDispatch, useSelector} from "react-redux";




function App() {

    const {notificationMessage, isShow} = useSelector(state => state.notification)
    const dispatch = useDispatch();

    return <>

        {(notificationMessage && <UiMessage text={notificationMessage} className={isShow ? 'visible' : 'hidden'} />)}
        <AppHeader/>
        <MainColumns>
            <BurgerIngredients/>
            <BurgerConstructor/>
        </MainColumns>


    </>
}

export default App;
