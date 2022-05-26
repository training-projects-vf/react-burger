import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { ModalOverlay } from '../ModalOverlay/ModalOverlay'
import { useEffect, useRef } from 'react'

export function Modal(props) {

  const { onClose } = props;
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) { ref.current.focus() }
  })

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target.id === 'container' || e.target.id === 'closeIcon') { onClose() }
  }

  const handleIconClick = (e) => {
    e.stopPropagation();
    onClose();
  }

  const handleKeydown = (e) => {
    if (e.key === 'Tab') { ref.current.focus() }
    if (e.key === 'Escape') { onClose() };
  }

  return (
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
            <p className="text text_type_main-large">{props.title}</p>
            <CloseIcon type="primary" id="closeIcon" onClick={handleIconClick} />
          </div>

          <div>
            {props.children}
          </div>

        </div>
      </div>
    </>
  )
}
