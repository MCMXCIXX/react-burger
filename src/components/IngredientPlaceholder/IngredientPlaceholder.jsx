import React from 'react';
import styles from './IngredientPlaceholder.module.scss';
import classNames from "classnames";


export const IngredientPlaceholder = (props) => {
  const {text, className = 'ingredient', accentPlaceholder} = props;

    return (
        <div style={accentPlaceholder ? { border: '1px dashed #fff' } : {}} className={classNames(styles['ingredient-placeholder'], styles[className])}>
          <p className={styles['ingredient-placeholder__text']}>{text}</p>
        </div>
    );
};