import React from 'react';
import styles from './IngredientPlaceholder.module.scss';
import classNames from "classnames";


export const IngredientPlaceholder = (props) => {
  const {text, className = 'ingredient'} = props;

    return (
        <div className={classNames(styles['ingredient-placeholder'], styles[className])}>
          <p className={styles['ingredient-placeholder__text']}>{text}</p>
        </div>
    );
};