import React from 'react';
import styles from './NotFoundPage.module.scss';


export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h2>Страница не найдена</h2>
            <p className="text text_type_digits-large">404</p>
        </div>
    );
};
