import './BurgerConstructor.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteConstructorIngredient,
    deleteBunToConstructor,
    submitOrder
} from "../../services/reducers/burgerConstructorReducer";
import {openModal} from "../../services/reducers/modalReducer";
import {IngredientPlaceholder} from "../IngredientPlaceholder/IngredientPlaceholder";
import {useDrop} from "react-dnd";
import {addIngredientsThunk} from "../../services/thunks/burgerConstructorThunks";
import {BurgerConstructorItem} from "../BurgerConstructorItem/BurgerConstructorItem";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useRef} from "react";

type TItem = {
    id: string;
    _id: string;
    type: string;
}
const BurgerConstructor = () => {
        const constructorData = useSelector((state: any)=> state.burgerConstructor.ingredients)
        const totalPrice = useSelector((state: any)=> state.burgerConstructor.totalPrice)
        const bun = useSelector((state: any)=> state.burgerConstructor.bun)
        const dispatch: any = useDispatch();
        const hasIngredients = constructorData.length > 0;
        const isAuthenticated = useSelector((state: any)=> state.auth.isAuthenticated);
        const navigate = useNavigate();
        const location = useLocation();

        const [{dragItemType}, dropTarget] = useDrop<TItem, void, {dragItemType: string | symbol | null}>({
            accept: "ingredient",
            drop(item) {
                dispatch(addIngredientsThunk(item.id));
            },
            collect: (monitor) => ({
                dragItemType: monitor.getItem()?.type,
            })
        });


    const handleOrder = () => {
        if(isAuthenticated){
            const ingredientIds = constructorData.map((item: any) => item._id);
            if (bun) ingredientIds.unshift(bun._id, bun._id); // если булки отдельно
            dispatch(submitOrder(ingredientIds));
        } else {
            navigate('/login', {state: {from: location}})
        }
    };


        return (
            <div className="burger-constructor">
                {
                    (<ul ref={(node) => {dropTarget(node)}} className="burger-constructor__list">
                        {
                            (bun ? <BurgerConstructorItem
                                    elementProps={{
                                        type: "top",
                                        text: `${bun.name} верх`,
                                        price: bun.price,
                                        thumbnail: bun.image,
                                        handleClose: () => {
                                            dispatch(deleteBunToConstructor(bun))
                                        },
                                    }}
                                    typeElement={'bun'}
                                    id={bun.id}
                                /> :
                                <IngredientPlaceholder accentPlaceholder={dragItemType === 'bun'} text={'Выберите булку'}/>)
                        }


                        {
                            (hasIngredients ? constructorData.map((ingredient: any, index: number)  => (
                                <BurgerConstructorItem
                                    typeElement={ingredient.type}
                                    elementProps={{
                                        text: ingredient.name,
                                        price: ingredient.price,
                                        thumbnail: ingredient.image,
                                        handleClose: () => {
                                            dispatch(deleteConstructorIngredient(ingredient))
                                        },
                                    }} index={index} id={ingredient.id}
                                    key={ingredient.id}/>
                            )) : <IngredientPlaceholder accentPlaceholder={!!dragItemType && dragItemType !== 'bun'}
                                                        text={'Выберите начинку'}/>)

                        }


                        {
                            (bun ? <BurgerConstructorItem
                                    elementProps={{
                                        type: "bottom",
                                        text: `${bun.name} низ`,
                                        price: bun.price,
                                        thumbnail: bun.image,
                                        handleClose: () => {
                                            dispatch(deleteBunToConstructor(bun))
                                        },
                                    }}
                                    typeElement={'bun'}
                                    id={bun.id}
                                />  :
                                <IngredientPlaceholder accentPlaceholder={dragItemType === 'bun'} text={'Выберите булку'}/>)
                        }
                    </ul>)
                }

                <div className="burger-constructor__total">
                    <p className="burger-constructor__total-value text text_type_main-large">{totalPrice} <CurrencyIcon
                        type="primary"/>
                    </p>
                    <Button htmlType="button" onClick={() => {
                        handleOrder()

                    }} type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>

            </div>
        )
    }
;

export default BurgerConstructor;
