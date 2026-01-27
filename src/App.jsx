import React, {useEffect, useState} from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import ingredientsData from "./data";
import MainColonums from "./components/MainColonums/MainColonums";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

function App() {


    const [constructorData, setConstructorData] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [ingredintsCount, setIngredientsCount] = useState({});


    const findIngredient = (id) => {
        const baseIngredient = ingredientsData.find(ingredient => ingredient._id === id)

        const newBaseIngredient = {
            ...baseIngredient,
            id: Date.now().toString(),
        }

        return newBaseIngredient

    }

    const requiredType = 'bun'

    const maxRequiredIngredients = 2;


    const addIngredients = (id) => {

        const newIngredient = findIngredient(id);


        if (!newIngredient) {
            console.error(`Ингредиент с ID ${id} не найден.`);
            return
        }

        const countRequiredIngredientsInConstructor = constructorData.filter(ingredient => ingredient.type === requiredType).length;


        if (newIngredient.type === requiredType) {
            if (countRequiredIngredientsInConstructor < maxRequiredIngredients) {
                setConstructorData((prevState) => [...prevState, newIngredient]);
                setIngredientsCount(prevCounts => ({
                    ...prevCounts,
                    [newIngredient._id]: (prevCounts[newIngredient._id] || 0) + 1
                }));
            } else {
                console.warn(`Достигнут лимит булок (${maxRequiredIngredients}).`);
            }
        }

        if (newIngredient.type !== requiredType) {
            if (countRequiredIngredientsInConstructor === 0) {
                console.warn("Сначала добавьте булку, чтобы начать сборку.");
                return;
            }
            setConstructorData((prevState) => [...prevState, newIngredient]);

            setIngredientsCount(prevCounts => ({
                ...prevCounts,
                [newIngredient._id]: (prevCounts[newIngredient._id] || 0) + 1
            }));
        }


    };

    const deleteIngredient = (id, ingredientTypeId) => {

        setConstructorData((prevState) => prevState.filter((item) => item.id !== id))

        setIngredientsCount(prevCounts => {
            const newCounts = {...prevCounts};

            if (newCounts[ingredientTypeId] > 0) {
                newCounts[ingredientTypeId] -= 1;
            }


            if (newCounts[ingredientTypeId] === 0) {
                delete newCounts[ingredientTypeId];
            }

            return newCounts;
        });

    }

    const updateTotalPrice = () => {

        setTotalPrice(constructorData.reduce((acc, ingredient) => acc + ingredient.price, 0));

    }

    useEffect(() => {
        // Суммируем ВСЕ значения в объекте ingredientCounts
        const totalCount = Object.values(ingredintsCount).reduce((sum, count) => sum + count, 0);
        console.log("Общее количество добавленных ингредиентов:", totalCount);
        console.log(ingredintsCount);
    }, [ingredintsCount]);

    useEffect(() => {
        updateTotalPrice();
    }, [constructorData])
    return <>
        <AppHeader/>

        <MainColonums>
            <BurgerIngredients
                ingredintsCount={ingredintsCount}
                onIngredientsClick={addIngredients}
                ingredientsData={ingredientsData}/>
            <BurgerConstructor
                totalPrice={totalPrice}
                deleteIngredient={deleteIngredient}
                maxRequiredIngredients={maxRequiredIngredients}
                constructorData={constructorData}/>
        </MainColonums>

    </>
}

export default App;
