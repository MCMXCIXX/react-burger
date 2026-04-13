import React from 'react';
import styles from './Composition.module.scss';
import {Ingredient} from "../../types/ingredient";




type CompositionProps = {
    ingredient: Ingredient;
}

export const Composition = (props : CompositionProps) => {
    const {ingredient} = props;
    return (
        <ul className={styles.composition}>
            <li className={styles.composition__item}>
                <p className="text text_type_main-default text_color_inactive">
                    Калории, ккал
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
    );
};
