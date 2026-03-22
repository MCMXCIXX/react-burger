import React from 'react';
import styles from './ProfilePage.module.scss';
import {Link, NavLink, Outlet} from "react-router-dom";
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {logout} from "../../../services/reducers/authSlice";
import {logoutThunk} from "../../../services/thunks/authThunks";


export const ProfilePage = () => {
   const dispatch = useDispatch();

    const handlerlogout = ()=> {
        dispatch(logoutThunk())
    }
    return (
        <div className={styles.container}>
            <nav className={styles.profile__navigation}>
                <NavLink end className={classNames(styles['profile__navigation-item'], 'text text_type_main-medium')} to="/profile">Профиль</NavLink>
                <NavLink className={classNames(styles['profile__navigation-item'], 'text text_type_main-medium')} to="/profile/orders">История заказов</NavLink>
                <button onClick={()=>handlerlogout()} className={classNames(styles['profile__navigation-item'], 'text text_type_main-medium')}>Выход</button>
            </nav>

            <Outlet />
        </div>
    );
};
