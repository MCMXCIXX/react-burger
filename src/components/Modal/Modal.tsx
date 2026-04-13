import './Modal.scss'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../services/reducers/modalReducer";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useEffect} from "react";
import {OrderDetails} from "../OrderDetails/OrderDetails";



const Modal = () => {
    const dispatch = useDispatch();
    const {modalIsOpen, typeModal, props, modalTitle} = useSelector((state: any) => state.modal);

    const modalComponents: any = {
        ingredientDetails: (props: any = {})=> props.ingredient ? <IngredientDetails ingredient={props.ingredient} /> : null,
        OrderDetails: ()=> <OrderDetails />,
    }

    useEffect(() => {

        const handleEsc = (e: KeyboardEvent): void => {
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
            <div
                className={"modal"}
                role="dialog"
                aria-modal="true"
                aria-label={ modalTitle ?? "Модальное окно"}
            >
                <button aria-label="Закрыть модальное окно" onClick={() => {
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
