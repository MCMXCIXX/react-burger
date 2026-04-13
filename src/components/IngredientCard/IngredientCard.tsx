import React from 'react';
import {openModal} from "../../services/reducers/modalReducer";
import {useDispatch, useSelector} from "react-redux";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {Ingredient} from "../../types/ingredient";

interface IngredientCardProps {
    ingredient: Ingredient;
}

export const IngredientCard = (props: IngredientCardProps) => {
    const {ingredient} = props;
    const dispatch = useDispatch();
    const ingredientsCount = useSelector((state: any) => state.burgerConstructor.ingredientsCount);
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: ingredient._id, type: ingredient.type },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <li ref={(node) => { dragRef(node); }} style={{opacity: opacity}} key={ingredient._id} className="ingredients-list__list-item" id={ingredient._id}

            onClick={() => {
                navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
                dispatch(openModal(
                    {
                        props: {
                            ingredient: ingredient,

                        },
                        typeModal: "ingredientDetails",
                        modalTitle: "Детали ингредиента",
                    }
                ))
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
        </li>
    );
};
