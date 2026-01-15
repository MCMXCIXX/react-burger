import React from 'react';
import './App.css';
import './styles/main.scss'
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import ingredientsData from "./data";
import MainColonums from "./components/MainColonums/MainColonums";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";

function App() {
    return <>
        <AppHeader/>

        <MainColonums>
            <BurgerIngredients ingredientsData={ingredientsData} />
            <BurgerConstructor constructorData={ingredientsData} />
        </MainColonums>

    </>
}

export default App;
