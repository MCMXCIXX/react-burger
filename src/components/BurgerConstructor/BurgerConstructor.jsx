import './BurgerConstructor.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteConstructorIngredient, deleteBunToConstructor} from "../../services/reducers/burgerConstructorReducer";
import {openModal} from "../../services/reducers/modalReducer";

const BurgerConstructor = () => {
        const constructorData = useSelector(state => state.burgerConstructor.ingredients)
        const totalPrice = useSelector(state => state.burgerConstructor.totalPrice)
        const bun = useSelector(state => state.burgerConstructor.bun)
        const dispatch = useDispatch();
        const hasIngredients = constructorData.length > 0;
        return (
            <div className="burger-constructor">
                {
                    (<ul className="burger-constructor__list">


                        {
                            (bun && <li className="burger-constructor__item burger-constructor__item--require" key={bun.id}>
                                <ConstructorElement
                                    type={"top"}
                                    text={`${bun.name} верх`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                    handleClose={() => {
                                        dispatch(deleteBunToConstructor(bun))
                                    }}
                                />
                            </li>)
                        }


                        {
                            (hasIngredients && constructorData.filter((ingredient) => ingredient.type !== "bun").map((ingredient, index) => (
                                <li className="burger-constructor__item" key={ingredient.id}>
                                    <div className="burger-constructor__item-icon">
                                        <DragIcon type="primary"/>
                                    </div>
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() => {
                                            dispatch(deleteConstructorIngredient(ingredient));
                                        }}
                                    />
                                </li>
                            )))

                        }


                        {
                            (bun && <li className="burger-constructor__item burger-constructor__item--require"
                                        key={`${bun.id}${bun.id}`}>
                                <ConstructorElement
                                    type={"bottom"}
                                    text={`${bun.name} низ`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                    handleClose={() => {
                                        dispatch(deleteBunToConstructor(bun))
                                    }}
                                />
                            </li>)
                        }
                    </ul>)
                }

                <div className="burger-constructor__total">
                    <p className="burger-constructor__total-value text text_type_main-large">{totalPrice} <CurrencyIcon
                        type="primary"/>
                    </p>
                    <Button htmlType="button" onClick={()=>{
                        dispatch(openModal('test'))
                    }} type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>

            </div>
        )
    }
;

export default BurgerConstructor;