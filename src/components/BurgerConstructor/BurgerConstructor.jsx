import './BurgerConstructor.scss';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

const BurgerConstructor = (props) => {
    const {constructorData} = props



    return <div className="burger-constructor">
        <ul className="burger-constructor__list">
            {constructorData.map((item) =>
                <li className="burger-constructor__item" key={item.id}>
                    <div className="burger-constructor__item-icon">
                        <DragIcon type="primary" />
                    </div>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </li>
            )}
        </ul>

        <div className="burger-constructor__total">

            <p className="burger-constructor__total-value text text_type_main-large">610 <CurrencyIcon type="primary"/>
            </p>
            <Button htmlType="button" type="primary" size="medium">
                Оформить заказ
            </Button>
        </div>

    </div>;
};

export default BurgerConstructor;