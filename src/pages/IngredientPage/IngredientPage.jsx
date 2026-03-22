import React from 'react';
import styles from './IngredientPage.module.scss';
import {useSelector} from "react-redux";
import {findIngredientThunk} from "../../services/thunks/burgerConstructorThunks";
import {useParams} from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";


export const IngredientPage = () => {
    const {ingredientId} = useParams();
    const ingredient = useSelector(state => state.ingredientData.ingredients.find(i => i._id === ingredientId));
    console.log(ingredient)

    if (!ingredient) return <p>Загрузка...</p>;

    return (
        <div className={styles.container}>
            <IngredientDetails ingredient={ingredient}/>
        </div>
    );
};
