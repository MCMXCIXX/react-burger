import './IngredientsList.scss';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {forwardRef, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addIngredientsThunk, fetchIngredientsData} from "../../services/thunks/burgerConstructorThunks";

const IngredientsList = forwardRef(((props, ref) => {
    const {type, title} = props

    const ingredientsCount = useSelector(state => state.burgerConstructor.ingredientsCount);

    const {ingredients, massageError, loading} = useSelector(state => state.burgerConstructor.ingredientData)
    const dispatch = useDispatch();

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(fetchIngredientsData());
        }
    }, [dispatch, ingredients.length]);

    return (
        <>
            <h2 className="text text_type_main-medium mb-6 mt-10">{title}</h2>
            <ul ref={ref} data-type={type} id={type} className="ingredients-list__list">
                {!loading && ingredients.filter((ingredient) => ingredient.type === type).map(ingredient =>
                    <li key={ingredient._id} className="ingredients-list__list-item" id={ingredient._id}

                        onClick={() => {
                            dispatch(addIngredientsThunk(ingredient._id))
                        }}>
                        <div className="ingredients-list__image-wrapper mb-1 ml-4 mr-4">
                            <img src={ingredient.image} alt={ingredient.name} className="ingredients-list__image "/>
                            {ingredientsCount?.[ingredient?._id ?? ''] && (
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


