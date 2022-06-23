import { useState } from "react";
import styles from './Header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "../NavLink/NavLink";
import { useSelector } from "react-redux";


export function Header() {
  const [isActive, setIsActive] = useState({
    constructor: true,
    list: false,
    cabinet: false,
  })

  const userName = useSelector(store => store.auth.user?.name)

  const handleLinkClick = (key) => {
    const state = { ...isActive }

    for (let element in state) {
      element === key ? state[element] = true : state[element] = false;
    }

    setIsActive({ ...state })
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navpanel}>
        <div className={styles.container_left}>
          <NavLink
            icon={<BurgerIcon type={isActive.constructor ? 'primary' : 'secondary'} />}
            link='/'
            caption='Конструктор'
            isActive={isActive.constructor}
            onClick={() => handleLinkClick('constructor')}
          />
          <NavLink
            icon={<ListIcon type={isActive.list ? 'primary' : 'secondary'} />}
            link='#'
            caption='Лента заказов'
            isActive={isActive.list}
            onClick={() => handleLinkClick('list')}
          />
        </div>

        <Logo />

        <div className={styles.container_right}>
          <NavLink
            icon={<ProfileIcon type={isActive.cabinet ? 'primary' : 'secondary'} />}
            link='/profile'
            caption={userName ? userName : 'Личный кабинет'}
            isActive={isActive.cabinet}
            onClick={() => handleLinkClick('cabinet')}
          />
        </div>
      </nav>
    </header>
  )
}
