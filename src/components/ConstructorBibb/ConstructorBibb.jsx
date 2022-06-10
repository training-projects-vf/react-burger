import styles from './ConstructorBibb.module.css'

export const TopBunBibb = () => {
  return (
    <div className={styles.bun_top}>
      <p className="text text_type_main-default">Добавьте булку</p>
    </div>
  )
}

export const FillingBibb = () => {
  return (
    <div className={styles.filling}>
      <p className="text text_type_main-default">Добавьте начинку</p>
    </div>
  )
}

export const BottomBunBibb = () => {
  return (
    <div className={styles.bun_bottom}>
      <p className="text text_type_main-default">Добавьте булку</p>
    </div>
  )
}
