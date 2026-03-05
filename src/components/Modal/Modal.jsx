import './Modal.scss'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {closeModal} from "../../services/reducers/modalReducer";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";

const Modal = () => {
    const dispatch = useDispatch();
    const {modalIsOpen, content} = useSelector(state => state.modal);
    return (
        <ModalOverlay modalIsOpen={modalIsOpen} >
            <div className={classNames('modal', `${modalIsOpen ? 'open' : ''}`)}>
                <button onClick={() => {
                    dispatch(closeModal());
                }} className="modal__close-button"><CloseIcon type="primary"/></button>

                <div className="modal__inner">
                    {content}
                </div>
            </div>
        </ModalOverlay>

    )
}

export default Modal