import './BurgerConstructor.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteConstructorIngredient} from "../../services/actions/burgerCosntructorActions";

const BurgerConstructor = (props) => {
    const {maxRequiredIngredients, deleteIngredient} = props
    const constructorData = useSelector(state=> state.burgerConstructor.ingredients)
    const totalPrice = useSelector(state=> state.burgerConstructor.totalPrice)
    const dispatch = useDispatch();

    const hasIngredients = constructorData.length > 0;

    const constructorDataFiltered = constructorData.filter((item) => item.type === "bun");
    return (
        <div className="burger-constructor">
            <ul className="burger-constructor__list">
                {
                    constructorDataFiltered.map((ingredient, index) => (
                        <li className="burger-constructor__item burger-constructor__item--require" key={ingredient.id}>
                            <ConstructorElement
                                isLocked={constructorData.length > maxRequiredIngredients}
                                type={index === 0 ? "top" : "bottom"}
                                text={`${ingredient.name} ${index > 0 ? "(низ)" : "(верх)"}`}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={()=>{dispatch(deleteConstructorIngredient(ingredient))}}
                            />
                        </li>
                    ))
                }


                {constructorData.filter((ingredient)=>ingredient.type !== "bun").map((ingredient, index) => (
                    <li className="burger-constructor__item" key={ingredient.id}>
                        <div className="burger-constructor__item-icon">
                            <DragIcon type="primary"/>
                        </div>
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            handleClose={()=>{dispatch(deleteConstructorIngredient(ingredient))}}
                        />
                    </li>
                ))}
            </ul>

            <div className="burger-constructor__total">
                <p className="burger-constructor__total-value text text_type_main-large">{totalPrice} <CurrencyIcon
                    type="primary"/>
                </p>
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>

        </div>
    )
};

export default BurgerConstructor;