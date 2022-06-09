import styles from "./Preloader.module.css";

export const Preloader = ({ message }) => {
  return (
    <div className={styles.section}>
      <p className={`text text_type_digits-medium ${styles.number_glow} mb-8`}>{message}</p>
      <p className="text text_type_main-medium mb-15"></p>
      <div className={styles.preloader}>
        <div className={styles.preloader_circle}></div>
      </div>
      <p className="text text_type_main-default mt-15 mb-2">ожидайте...</p>
      <p className="text text_type_main-default text_color_inactive mb-15"></p>
    </div>
  );
};
