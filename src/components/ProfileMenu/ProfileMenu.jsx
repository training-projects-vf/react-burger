import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions';
import styles from './ProfileMenu.module.css'

export function ProfileMenu() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const onExitClick = e => {
    e.preventDefault()
    dispatch(logout());
  }

  return (
    <div className={styles.profile}>
      <section className={styles.section_menu}>
        <ul>
          <li>
            <Link to='/profile' className={styles.link}>
              <p className={`text text_type_main-medium ${pathname === '/profile' ? styles.white : styles.grey} mb-9`} >
                Профиль
              </p>
            </Link>
          </li>
          <li>
            <Link to='/profile/orders' className={styles.link}>
              <p className={`text text_type_main-medium ${pathname === '/profile/orders' ? styles.white : styles.grey} mb-9`} >
                История заказов
              </p>
            </Link>
          </li>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.grey} mb-20`} onClick={onExitClick} >
                Выход
              </p>
            </Link>
          </li>
        </ul>
        <p className={`text text_type_main-small ${styles.grey}`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <Outlet />
    </div>
  )

}
