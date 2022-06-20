import { EditIcon, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'

export function Profile() {

  return (
    <div className={styles.profile}>
      <section className={styles.section_menu}>
        <ul>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mt-5 mb-9`}>
                Профиль
              </p>
            </Link>
          </li>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mb-9`}>
                История заказов
              </p>
            </Link>
          </li>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mb-20`}>
                Выход
              </p>
            </Link>
          </li>
        </ul>
        <p className={`text text_type_main-small ${styles.color}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>

      <form className={styles.form_profile}>
        <Input value={"name"} placeholder={'Имя'} name={'name'}
          autocomplete="name">
          <EditIcon />
        </Input>
        <Input value={"email"} placeholder={'Логин'} name={'login'}
          autocomplete="email" >
          <EditIcon />
        </Input>
        <Input value={"password"} placeholder={'Пароль'} name={'password'}
          autocomplete="new-password" >
          <EditIcon />
        </Input>
      </form>
    </div>

  )
}
