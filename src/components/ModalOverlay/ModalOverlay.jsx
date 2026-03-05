import React from 'react';
import styles from './ModalOverlay.module.scss';
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {closeModal} from "../../services/reducers/modalReducer";


export const ModalOverlay = (props) => {
    const {children, modalIsOpen} = props;
    const dispatch = useDispatch();

    const handleOverlayClick = (e) => {
        if(e.target === e.currentTarget) {
            dispatch(closeModal())
        }
    }
    return (
        <div onClick={handleOverlayClick} className={classNames(styles['modal-overlay'], {[styles.open]: modalIsOpen})}>
            {children}
        </div>
    );
};