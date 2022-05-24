import { useEffect, useRef } from 'react'
import styles from './ModalOverlay.module.css'

export function ModalOverlay(props) {
  console.log('ModalOverlay', props)
  const { closeModal } = props;
  const ref = useRef(null);

  useEffect(() => {
    console.log('useEffect')
    ref.current.focus()
  }, [])

  const handleClick = (e) => {
    console.log('handleClick')
    closeModal()
  }

  const handleKeydown = (e) => {
    console.log('handleKeydown')
    if (e.keyCode === 27) { closeModal() }
  }

  return (
    <>
      <div id="overlay"
        ref={ref}
        tabIndex="1"
        className={styles.overlay}
        onClick={handleClick}
        onKeyDown={handleKeydown}>
      </div>
    </>
  )
}
