import React from 'react';
import styles from './ModalOverlay.module.scss';
import classNames from "classnames";


export const ModalOverlay = (props) => {
    const {children, modalIsOpen} = props;
    return (
        <div className={classNames(styles['modal-overlay'], {[styles.open]: modalIsOpen})}>
            {children}
        </div>
    );
};