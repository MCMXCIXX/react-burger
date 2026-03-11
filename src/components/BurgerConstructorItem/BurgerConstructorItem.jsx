import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {moveIngredient} from "../../services/reducers/burgerConstructorReducer";


export const BurgerConstructorItem = (props) => {
    const { index = 0, id, typeElement, elementProps} = props
    const dispatch = useDispatch();
    const ref = useRef(null)
    const [{handlerId}, drop] = useDrop({
        accept: 'mainIngredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(moveIngredient({dragIndex, hoverIndex}));

            item.index = hoverIndex
        },
    })
    const [{isDragging}, drag] = useDrag({
        type: 'mainIngredient',
        item: () => {
            return {id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    const additionalProps = typeElement !== 'bun'
        ? {
            ref: ref,
            style: {opacity,cursor: 'move'},
            'data-handler-id': handlerId,
        }
        : {};
    return (
        <li {...additionalProps} className="burger-constructor__item">
            {(typeElement !== 'bun') && (
                <div className="burger-constructor__item-icon">
                    <DragIcon type="primary"/>
                </div>
            )}
            <ConstructorElement
                {...elementProps}
            />
        </li>
    );
};