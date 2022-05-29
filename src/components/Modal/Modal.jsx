/* eslint-disable react-hooks/exhaustive-deps */
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import { modalType } from '../../utils/propTypes';

export function Modal(props) {
  const { onClose, title, children } = props;
  const ref = useRef(null)
  const modalRoot = document.getElementById('modal-root')


  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeydown(e));

    return () => {
      window.removeEventListener('keydown', (e) => handleKeydown(e));
    }
  }, [])

  const handleOverlayClick = (e) => {
    if (e.target.id === 'container' || e.target.id === 'closeIcon') { onClose() }
  }

  const handleIconClick = (e) => {
    onClose();
  }

  const handleKeydown = (e) => {
    if (e.key === 'Escape') { onClose() };
  }

  return createPortal(
    <>
      <ModalOverlay />
      <div className={styles.container} id="container" onClick={handleOverlayClick} >
        <div
          ref={ref}
          tabIndex="1"
          className={styles.content_container}
          onKeyDown={handleKeydown}
        >
          <div className={styles.title_container} >
            <p className="text text_type_main-large">{title}</p>
            {props.onClose && <CloseIcon type="primary" id="closeIcon" onClick={handleIconClick} />}
          </div>

          <div>
            {children}
          </div>

        </div>
      </div>
    </>,
    modalRoot
  )
}

Modal.propTypes = modalType;
