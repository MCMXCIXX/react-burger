import React from 'react';
import styles from './FeedPage.module.scss';
import {Link} from "react-router-dom";


export const FeedPage = () => {
    return (
        <div className={styles.container}>
            <div>Лента заказов</div>
            <Link to="/feed/1">Заказ №1</Link>
            <Link to="/feed/2">Заказ №2</Link>
        </div>
    );
};
