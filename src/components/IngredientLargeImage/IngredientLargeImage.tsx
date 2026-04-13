import React from 'react';
import styles from './IngredientLargeImage.module.scss';
import {Ingredient} from "../../types/ingredient";
interface IngredientLargeImageProps {
    ingredient: Ingredient;
}
export const IngredientLargeImage = (props: IngredientLargeImageProps) => {
    const {ingredient} = props;
    return (
        <div className={styles['ingredient-large-image']}>
            <img src={ingredient.image_large} alt={ingredient.name} className={styles['ingredient-large-image__image']}/>
        </div>
    );
};
