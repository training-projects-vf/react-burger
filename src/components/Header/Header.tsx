import { useState } from "react";
import styles from './Header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { HeaderItem } from "../HeaderItem/HeaderItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export function Header() {
  interface IActive {
    constructor: boolean;
    list: boolean;
    cabinet: boolean;
  }

  const [isActive, setIsActive] = useState<IActive>({
    constructor: true,
    list: false,
    cabinet: false,
  })

  const userName = useSelector((store: any) => store.auth.user?.name)

  const handleLinkClick = (key: string) => {
    const state = { ...isActive }
    console.log('state', state)

    for (let element in state) {
      // ниже 2 способа решения проблемы "Element implicitly has an 'any' type because expression of type 'string' can't be used to index"
      element === key ? state[element as keyof IActive] = true : state[element as keyof typeof state] = false;
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

        <Link to='/'>
          <Logo />
        </Link>

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
