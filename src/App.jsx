import React, {useEffect, useState} from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import ingredientsData from "./data";
import MainColumns from "./components/MainColumns/MainColumns";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import { useNotifications} from "./context/NotificationContext";

function App() {


    const [constructorData, setConstructorData] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [ingredientsCount, setIngredientsCount] = useState({});

    const { showNotification } = useNotifications();

    const findIngredient = (id) => {
        const baseIngredient = ingredientsData.find(ingredient => ingredient._id === id)
        if (baseIngredient) {
            const newBaseIngredient = {
                ...baseIngredient,
                id: crypto.randomUUID(),
            }

            return newBaseIngredient
        }

    }

    const requiredType = 'bun'

    const maxRequiredIngredients = 2;


    const addIngredients = (id) => {

        const newIngredient = findIngredient(id);


        if (!newIngredient) {
            showNotification(`Ингредиент с ID ${id} не найден.`)
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
                showNotification(`Достигнут лимит булок (${maxRequiredIngredients}).`, 2500);

            }
        }

        if (newIngredient.type !== requiredType) {
            if (countRequiredIngredientsInConstructor === 0) {
                showNotification("Сначала добавьте булку, чтобы начать сборку.", 2500);

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
        updateTotalPrice();
    }, [constructorData])
    return <>



            <AppHeader/>

            <MainColumns>
                <BurgerIngredients
                    ingredientsCount={ingredientsCount}
                    onIngredientsClick={addIngredients}
                    ingredientsData={ingredientsData}/>
                <BurgerConstructor
                    totalPrice={totalPrice}
                    deleteIngredient={deleteIngredient}
                    maxRequiredIngredients={maxRequiredIngredients}
                    constructorData={constructorData}/>
            </MainColumns>


    </>
}

export default App;
