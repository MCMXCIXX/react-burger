import React from 'react';
import styles from './IngredientLargeImage.module.scss';


export const IngredientLargeImage = (props) => {
    const {ingredient} = props;
    return (
        <div className="ingredient-large-image">
            <img src={ingredient.image_large} alt={ingredient.name} className="ingredient-large-image__image"/>
        </div>
    );
};