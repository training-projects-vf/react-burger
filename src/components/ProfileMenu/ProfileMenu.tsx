import { MouseEvent, useState } from 'react';
import { useDispatch } from '../../redux/store';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions';
import styles from './ProfileMenu.module.css'

export function ProfileMenu() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [isExitClicked, setIsExitClicked] = useState(false);

  const onExitClick = (e: MouseEvent) => {
    e.preventDefault()
    setIsExitClicked(true);
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
              <p className={`text text_type_main-medium ${isExitClicked ? styles.white : styles.grey} mb-20`} onClick={onExitClick} >
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
