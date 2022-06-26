import { useState } from "react";
import styles from './Header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderItem } from "../HeaderItem/HeaderItem";
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
          <HeaderItem
            icon={<BurgerIcon type={isActive.constructor ? 'primary' : 'secondary'} />}
            link='/'
            caption='Конструктор'
            isActive={isActive.constructor}
            onClick={() => handleLinkClick('constructor')}
          />
          <HeaderItem
            icon={<ListIcon type={isActive.list ? 'primary' : 'secondary'} />}
            link='/profile/orders'
            caption='Лента заказов'
            isActive={isActive.list}
            onClick={() => handleLinkClick('list')}
          />
        </div>

        <Logo />

        <div className={styles.container_right}>
          <HeaderItem
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
