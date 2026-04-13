import styles from './IngredientDetails.module.scss'
import {Composition} from "../Composition/Composition";
import {IngredientLargeImage} from "../IngredientLargeImage/IngredientLargeImage";
import {Ingredient} from "../../types/ingredient";


interface IngredientDetailsProps {
    ingredient?: Ingredient;
}

const IngredientDetails = (props: IngredientDetailsProps) => {
    const {ingredient} = props;
    if(!ingredient){
        return null;
    }
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
