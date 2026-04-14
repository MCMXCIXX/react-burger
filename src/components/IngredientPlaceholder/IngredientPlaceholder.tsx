import React from 'react';
import styles from './IngredientPlaceholder.module.scss';
import classNames from "classnames";

interface IngredientPlaceholderProps {
    text: string;
    className?: string;
    accentPlaceholder?: boolean;
}

export const IngredientPlaceholder = (props: IngredientPlaceholderProps) => {
  const {text, className = 'ingredient', accentPlaceholder} = props;

    return (
        <div style={accentPlaceholder ? { border: '1px dashed #fff' } : {}} className={classNames(styles['ingredient-placeholder'], styles[className])}>
          <p className={styles['ingredient-placeholder__text']}>{text}</p>
        </div>
    );
};
