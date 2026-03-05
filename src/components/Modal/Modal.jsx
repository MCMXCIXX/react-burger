import './Modal.scss'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {closeModal} from "../../services/reducers/modalReducer";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useEffect} from "react";
import {OrderDetails} from "../OrderDetails/OrderDetails";

const Modal = () => {
    const dispatch = useDispatch();
    const {modalIsOpen, typeModal, props} = useSelector(state => state.modal);

    const modalComponents = {
        ingredientDetails: (props = {})=> props.ingredient ? <IngredientDetails ingredient={props.ingredient} /> : null,
        OrderDetails: ()=> <OrderDetails />,
    }

    useEffect(() => {

        const handleEsc = (e) => {
            if(e.key === "Escape") {
                dispatch(closeModal());
            }
        }

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        }
    }, [dispatch]);

    if (!modalIsOpen || !typeModal) return null;
    const modalContent = modalComponents[typeModal]?.(props);
    if (!modalContent) return null;



    return (
        <ModalOverlay modalIsOpen={modalIsOpen}  >
            <div className={classNames('modal', `${modalIsOpen ? 'open' : ''}`)}>
                <button onClick={() => {
                    dispatch(closeModal());
                }} className="modal__close-button"><CloseIcon type="primary"/></button>

                <div className="modal__inner">
                    {modalContent}
                </div>
            </div>
        </ModalOverlay>

    )
}

export default Modal