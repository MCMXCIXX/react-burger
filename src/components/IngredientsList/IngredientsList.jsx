import './IngredientsList.scss';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addIngredientsThunk} from "../../services/thunks/burgerConstructorThunks";
import {fetchIngredientsData} from "../../services/reducers/ingredientDataReducer";
import {openModal} from "../../services/reducers/modalReducer";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const IngredientsList = forwardRef(((props, ref) => {
    const {type, title} = props

    const ingredientsCount = useSelector(state => state.burgerConstructor.ingredientsCount);

    const {ingredients} = useSelector(state => state.ingredientData);

    const dispatch = useDispatch();



    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-10">{title}</h2>
            <ul ref={ref} data-type={type} id={type} className="ingredients-list__list">
                {ingredients.filter((ingredient) => ingredient.type === type).map(ingredient =>
                    <li key={ingredient._id} className="ingredients-list__list-item" id={ingredient._id}

                        onClick={() => {
                            dispatch(openModal(<IngredientDetails ingredient={ingredient} />))
                        }}>
                        <div className="ingredients-list__image-wrapper mb-1 ml-4 mr-4">
                            <img src={ingredient.image} alt={ingredient.name} className="ingredients-list__image "/>
                            {ingredientsCount[ingredient?._id] > 0 && (
                                <Counter count={ingredientsCount[ingredient._id]} size="small" />
                            )}


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


