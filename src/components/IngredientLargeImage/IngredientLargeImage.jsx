import React from 'react';
import styles from './IngredientLargeImage.module.scss';


export const IngredientLargeImage = (props) => {
    const {ingredient} = props;
    return (
        <div className={styles['ingredient-large-image']}>
            <img src={ingredient.image_large} alt={ingredient.name} className={styles['ingredient-large-image__image']}/>
        </div>
    );
};