import styles from './IngredientDetails.module.scss'
import {Composition} from "../Composition/Composition";
import {IngredientLargeImage} from "../IngredientLargeImage/IngredientLargeImage";

const IngredientDetails = (props) => {
    const {ingredient} = props;
    return (
        <div className={styles['ingredient-details']}>
            <p className="text text_type_main-large">
                Детали ингредиента
            </p>

            <div className={styles['ingredient-details__inner']}>

                <IngredientLargeImage ingredient={ingredient}/>

                <p className="text text_type_main-medium">
                    {ingredient.name}
                </p>

                <Composition ingredient={ingredient}/>

            </div>

        </div>
    )
}

export default IngredientDetails;