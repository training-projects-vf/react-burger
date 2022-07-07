/* eslint-disable react-hooks/exhaustive-deps */
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { ModalOverlay } from '../Overlay/Overlay'
import React, { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';

interface IProps {
  onClose?: () => never;
  title: string;
  children?: ReactNode;
}

export function Modal(props: IProps) {
  const { onClose, title, children } = props;
  const ref = useRef(null);
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [])

  const handleOverlayClick = (e) => {
    if (!!onClose && (e.target.id === 'container' || e.target.id === 'closeIcon')) {
      onClose();
    }
  }

  const handleIconClick = () => {
    if (onClose) {
      onClose();
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (!!onClose && e.key === 'Escape') {
      onClose()
    };
  }

  return createPortal(
    <>
      <ModalOverlay />
      <div className={styles.container} id="container" onClick={handleOverlayClick} >
        <div
          ref={ref}
          tabIndex={1}
          className={styles.content_container}
          onKeyDown={handleKeydown}
        >
          <div className={styles.title_container} >
            <p className="text text_type_main-large">{title}</p>
            {onClose && (
              <CloseIcon
                type="primary"
                // id="closeIcon"
                onClick={handleIconClick}
              />
              )}
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
