import React from 'react';
import styles from './BurgerConstructorItem.module.scss';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {deleteConstructorIngredient} from "../../services/reducers/burgerConstructorReducer";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";


export const BurgerConstructorItem = (props) => {
    const {ingredient} = props
    const dispatch = useDispatch();
    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: ingredient._id, type: ingredient.type },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    return (
        <li ref={dragRef} style={{opacity: opacity}} className="burger-constructor__item" key={ingredient.id}>
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
    );
};