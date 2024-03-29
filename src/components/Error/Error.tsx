import styles from './Error.module.css'

interface IProps {
  errorMessage: string | undefined;
  errorMessage2?: string;
  errorMessage3?: string;
}

export function Error(props: IProps) {
  const { errorMessage, errorMessage2, errorMessage3 } = props;

  return (
    <div
      className={styles.section}
    >
      <p className={`text text_type_digits-large ${styles.number_glow} mb-8`}>ERROR</p>
      <p className={`text text_type_main-medium mb-15 ${styles.text_error}`}>{errorMessage}</p>
      <p className="text text_type_main-default mt-15 mb-2">{errorMessage2}</p>
      <p className="text text_type_main-default text_color_inactive mb-15">{errorMessage3}</p>
    </div>
  )
}
