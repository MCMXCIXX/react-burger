import './BurgerIngredients.scss';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef} from "react";
import IngredientsList from "../IngredientsList/IngredientsList";
import Data from "../../data";

const BurgerIngredients = (props) => {
    const {className, onIngredientsClick, ingredientsData, ingredientsCount} = props
    const [current, setCurrent] = React.useState('bun');

    const ingredientsListRefs = useRef([]);

    const ingredientsListDataRender = [
        {title: "Булки", type: "bun"}, {title: "Начинка", type: "main"}, {title: "Соусы", type: "sauce"},
    ]

    const setIngredientsListRefs = (index) => (node) => {

        ingredientsListRefs.current[index] = node;
    };

    useEffect(() => {

        ingredientsListRefs.current.filter((ingredient, index) => {
            return ingredient.id === current
        })[0]?.scrollIntoView({behavior: "smooth"});
    }, [current]);


    return (
        <div className="burger-ingredients pt-5">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <div style={{display: 'flex'}}>
                {ingredientsListDataRender.map(({type, title}) => {
                    return (
                        <Tab
                            value={type}
                            active={current === type}
                            key={type}
                            onClick={setCurrent}>
                            {title}
                        </Tab>
                    )

                })}

            </div>

            <div className="burger-ingredients__list-warpper">

                {ingredientsListDataRender.map(({type, title}, index) => {
                    return (
                        <IngredientsList
                            ingredientsCount={ingredientsCount}
                            ref={setIngredientsListRefs(index)}
                            ingredientsData={ingredientsData}
                            key={type}
                            title={title}
                            type={type}
                            id={type}
                            onIngredientsClick={onIngredientsClick}
                        />
                    )
                })}

            </div>


        </div>
    )
};

export default BurgerIngredients;