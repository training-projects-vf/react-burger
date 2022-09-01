import styles from './Header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderItem } from "../HeaderItem/HeaderItem";
import { useSelector } from "../../redux/store";
import { Link, useLocation } from "react-router-dom";


export function Header() {
  const location = useLocation();
  const { pathname } = location;

  const userName = useSelector((store) => store.auth.user?.name)

  return (
    <header className={styles.header}>
      <nav className={styles.navpanel}>
        <div className={styles.container_left}>
          <HeaderItem
            icon={<BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />}
            link='/'
            caption='Конструктор'
            isActive={pathname === '/'}
          />
          <HeaderItem
            icon={<ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />}
            link='/feed'
            caption='Лента заказов'
            isActive={pathname === '/feed'}
          />
        </div>

        <Link to='/'>
          <Logo />
        </Link>

        <div className={styles.container_right}>
          <HeaderItem
            icon={<ProfileIcon type={pathname === '/profile' || pathname === '/profile/orders' ? 'primary' : 'secondary'} />}
            link='/profile'
            caption={userName ? userName : 'Личный кабинет'}
            isActive={pathname === '/profile' || pathname === '/profile/orders'}
          />
        </div>
      </nav>
    </header>
  )
}
