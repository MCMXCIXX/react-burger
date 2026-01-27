import './IngredientsList.scss';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef} from "react";

const IngredientsList = forwardRef(((props, ref) => {
    const {ingredientsData, type, onIngredientsClick, title,ingredientsCount } = props


    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-10">{title}</h2>
            <ul ref={ref} id={type} className="ingredients-list__list">
                {ingredientsData.filter((ingredient) => ingredient.type === type).map(ingredient =>
                    <li key={ingredient._id} className="ingredients-list__list-item" id={ingredient._id}
                        onClick={() => {
                            onIngredientsClick(ingredient._id)
                        }}>
                        <div className="ingredients-list__image-wrapper mb-1 ml-4 mr-4">
                            <img src={ingredient.image} alt={ingredient.name} className="ingredients-list__image "/>
                            {(ingredientsCount [ingredient._id] && <Counter count={ingredientsCount [ingredient._id]} size="small"/>)}


                        </div>
                        <p className="ingredients-list__price mb-1 text text_type_main-default">{ingredient.price}
                            <CurrencyIcon type="primary"/></p>
                        <p className="ingredients-list__name mb-1 text text_type_main-default">{ingredient.name}</p>
                    </li>)}
            </ul>
        </>

    )
}))

export default IngredientsList;


