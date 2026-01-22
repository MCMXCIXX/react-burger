import './BurgerConstructor.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

const BurgerConstructor = (props) => {
    const {constructorData, maxRequiredIngredients, deleteIngredient, totalPrice} = props

    const hasIngredients = constructorData.length > 0;

    const constructorDataFiltered = constructorData.filter((item) => item.type === "bun");
    return (
        <div className="burger-constructor">
            <ul className="burger-constructor__list">
                {
                    constructorDataFiltered.map((ingredient, index) => (
                        <li className="burger-constructor__item burger-constructor__item--require" key={crypto.randomUUID()}>
                            <ConstructorElement
                                isLocked={constructorData.length > maxRequiredIngredients}
                                type={index === 0 ? "top" : "bottom"}
                                text={`${ingredient.name} ${index > 0 ? "(низ)" : "(верх)"}`}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={()=>{deleteIngredient(ingredient.id, ingredient._id)}}
                            />
                        </li>
                    ))
                }

                {constructorData.map((ingredient) =>
                    ingredient.type !== "bun" && (
                            <li className="burger-constructor__item" key={crypto.randomUUID()}>
                                <div className="burger-constructor__item-icon">
                                    <DragIcon type="primary"/>
                                </div>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={()=>{deleteIngredient(ingredient.id, ingredient._id)}}
                                />
                            </li>
                        )
                )}
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