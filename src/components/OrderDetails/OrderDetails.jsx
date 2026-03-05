import React from 'react';
import styles from './OrderDetails.module.scss';
import isDoneIcon from '../../assets/images/icons/isDoneIcon.png'

export const OrderDetails = () => {
    return (
        <div className={styles.container}>
            <p className="text text_type_digits-large pb-8">034536</p>
            <p className="text text_type_main-medium">
                идентификатор заказа
            </p>
            <img src={isDoneIcon} className="pt-15 pb-15" alt="Готово, галочка"/>

            <p className="text text_type_main-small">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>

    );
};