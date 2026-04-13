import React from 'react';
import styles from './ModalOverlay.module.scss';
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {closeModal} from "../../services/reducers/modalReducer";

interface ModalOverlayProps {
    children: React.ReactNode;
    modalIsOpen: boolean;
}
export const ModalOverlay = (props: ModalOverlayProps) => {
    const {children, modalIsOpen} = props;
    const dispatch = useDispatch();



    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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
