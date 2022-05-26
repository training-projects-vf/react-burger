import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom"
import { Modal } from "../Modal/Modal";
import styles from './OrderDetails.module.css'

export function OrderDetails(props) {
  const modalRoot = document.getElementById('modal-root');

  return createPortal(
    <Modal
      title=""
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className={styles.section}>
        <p className={`text text_type_digits-large ${styles.number_glow} mb-8`}>034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <div>
          <CheckMarkIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mb-15">дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>,
    modalRoot
  )

}
