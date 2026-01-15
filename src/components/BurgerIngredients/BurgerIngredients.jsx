import './BurgerIngredients.scss';
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientsList from "../IngredientsList/IngredientsList";

const BurgerIngredients = (props) => {
    const {className, ingredientsData} = props
    const [current, setCurrent] = React.useState('one')
    return (
        <div className="burger-ingredients pt-5">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    One
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Two
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Three
                </Tab>
            </div>

            <div className="burger-ingredients__list-warpper">
                <IngredientsList ingredientsData={ingredientsData} title="Булки" type="bun"/>

                <IngredientsList ingredientsData={ingredientsData} title="Начинка" type="main"/>

                <IngredientsList ingredientsData={ingredientsData} title="Соусы" type="sauce"/>
            </div>


        </div>
    )
};

export default BurgerIngredients;