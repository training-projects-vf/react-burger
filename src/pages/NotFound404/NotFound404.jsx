import styles from "./NotFound404.module.css";

export function NotFound404() {

  return (
    <section className={styles.section} >
      <p className={`text text_type_digits-large ${styles.number_glow} `}>ERROR 404</p>
    </section>
  )
}
