import React from 'react';
import styles from './OrderPage.module.scss';
import {useParams} from "react-router-dom";


export const OrderPage = () => {

    const {orderId} = useParams();

    return (
        <div className={styles.container}>
            <h2>Страница заказа №{orderId}</h2>
        </div>
    );
};
