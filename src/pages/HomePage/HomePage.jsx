import React from 'react';
import styles from './HomePage.module.scss';
import {DndProvider} from "react-dnd";
import MainColumns from "../../components/MainColumns/MainColumns";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";


export const HomePage = () => {
    return (
        <div className={styles.container}>
            <DndProvider backend={HTML5Backend}>
                <MainColumns>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </MainColumns>
            </DndProvider>
        </div>
    );
};
