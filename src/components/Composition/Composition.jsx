import React from 'react';
import styles from './Composition.module.scss';


export const Composition = (props) => {
    const {ingredient} = props;
    return (
        <div className={styles.container}>
            <ul className={styles.composition}>
                <li className={styles.composition__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {ingredient.calories}
                    </p>
                </li>
                <li className={styles.composition__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {ingredient.proteins}
                    </p>
                </li>
                <li className={styles.composition__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {ingredient.fat}
                    </p>
                </li>
                <li className={styles.composition__item}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {ingredient.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    );
};