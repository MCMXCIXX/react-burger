import './IngredientsList.scss';
import React, {forwardRef} from "react";
import {useSelector} from "react-redux";
import {IngredientCard} from "../IngredientCard/IngredientCard";
import {Ingredient} from "../../types/ingredient";

interface IngredientsListProps {
    type: string;
    title: string;
}



const IngredientsList = forwardRef<HTMLHeadingElement, IngredientsListProps>(((props, ref) => {
    const {type, title} = props
    const {ingredients} = useSelector((state: any) => state.ingredientData);

    return (
        <>
            <h2 id={type} data-type={type} ref={ref} className="ingredients-list__title text text_type_main-medium mb-6 mt-10">{title}</h2>
            <ul  className="ingredients-list__list">
                {ingredients.filter((ingredient: Ingredient) => ingredient.type === type).map((ingredient: Ingredient) => {
                    return (
                        <IngredientCard ingredient={ingredient} key={ingredient._id} />
                    )
                })}
            </ul>
        </>

    )
}))

export default IngredientsList;


