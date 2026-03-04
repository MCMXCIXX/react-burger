import './BurgerIngredients.scss';
import {Button, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef} from "react";
import IngredientsList from "../IngredientsList/IngredientsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredientsData} from "../../services/reducers/ingredientDataReducer";

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    const dispatch = useDispatch();
    const {ingredients, loading, error} = useSelector(state => state.ingredientData);

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


    useEffect(() => {
        if (!loading && ingredients.length === 0 && !error) {
            dispatch(fetchIngredientsData());
        }
    }, [dispatch, loading, ingredients.length, error]);



    if(loading){
        return <h2>Загрузка...</h2>
    }

    if(error){
        return (
            <div>6
                <h2>{error}</h2>
                <Button onClick={()=>{
                    dispatch(fetchIngredientsData())
                }} htmlType="button" type="primary" size="medium">
                    Повторить загрузку
                </Button>
            </div>
        )
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