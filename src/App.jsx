import React, {useEffect} from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import UiMessage from "./components/UiMessage/UiMessage";
import Modal from "./components/Modal/Modal";
import {RootRouters} from "./components/RootRouters/RootRouters";
import {useDispatch, useSelector} from "react-redux";
import {getUser, refreshToken} from "./services/thunks/authThunks";



function App() {

    const {notificationMessage, isShow} = useSelector(state => state.notification)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('App init, token:', localStorage.getItem('accessToken'));
        const initAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return; // нет токена — ничего не делаем

            try {
                // Пробуем получить пользователя
                await dispatch(getUser()).unwrap();
            } catch (error) {
                // Если ошибка 401 — пробуем обновить токен
                if (error.message?.includes('401') || error?.status === 401) {
                    try {
                        await dispatch(refreshToken()).unwrap();
                        // после обновления снова пробуем получить пользователя
                        await dispatch(getUser()).unwrap();
                    } catch (refreshError) {
                        // обновление не удалось — чистим токены
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                    }
                } else {
                    // другая ошибка — тоже чистим (или логируем)
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }
        };

        initAuth();
    }, [dispatch]);
    return <>

        {(notificationMessage && <UiMessage text={notificationMessage} className={isShow ? 'visible' : 'hidden'}/>)}
        <Modal/>
        <AppHeader/>
        <RootRouters/>

    </>
}

export default App;
