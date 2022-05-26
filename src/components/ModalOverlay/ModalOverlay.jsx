import styles from './ModalOverlay.module.css'

export function ModalOverlay(props) {

  return (
    <>
      <div id="overlay"
        className={styles.overlay}
        onClick={props.onClick}
      >
      </div>
    </>
  )
}
