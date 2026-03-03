import './BurgerIngredients.scss';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef} from "react";
import IngredientsList from "../IngredientsList/IngredientsList";
import {useSelector} from "react-redux";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');

    const {loading, error} = useSelector(state => state.ingredientData);

    const ingredientsListRefs = useRef([]);

    const ingredientsListDataRender = [
        {title: "Булки", type: "bun"}, {title: "Начинка", type: "main"}, {title: "Соусы", type: "sauce"},
    ]

    const setIngredientsListRefs = (index) => (node) => {

        ingredientsListRefs.current[index] = node;
    };

    useEffect(() => {

        const node = ingredientsListRefs.current.find((n) => n?.dataset?.type === current);
        node?.scrollIntoView({behavior: "smooth", block: "start"});

    }, [current]);



    if(loading){
        return <h2>Загрузка...</h2>
    }
    if(error){
        return <h2>{error}</h2>
    }
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
                            ref={setIngredientsListRefs(index)}
                            key={type}
                            title={title}
                            type={type}
                            id={type}
                        />
                    )
                })}

            </div>

        </div>
    )
};

export default BurgerIngredients;