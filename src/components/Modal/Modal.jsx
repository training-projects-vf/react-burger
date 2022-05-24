import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import { useEffect, useState } from 'react'

export function Modal(props) {
  const modalRoot = document.getElementById('modal-root')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  function closeModal() {
    setIsOpen(false)
  }

  if (!isOpen) { return null }

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.title_container}>
            <p>Детали ингредиента</p>
            <CloseIcon type="primary" />
          </div>
        </div>
      </div>
    </>,
    modalRoot
  )
}
