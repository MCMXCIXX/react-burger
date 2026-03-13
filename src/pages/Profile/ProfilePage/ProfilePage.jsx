import React from 'react';
import styles from './ProfilePage.module.scss';
import {Link, Outlet} from "react-router-dom";


export const ProfilePage = () => {
    return (
        <div className={styles.container}>
            <div>Профиль</div>
            <nav>
                <Link to="/profile">Информация</Link>
                <Link to="/profile/orders">История заказов</Link>
            </nav>

            <Outlet />
        </div>
    );
};
