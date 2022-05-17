import React from "react";
import styles from './AppHeader.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "../NavLink/NavLink";

export class AppHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: {
        constructor: true,
        list: false,
        cabinet: false,
      }
    }
  }

  clickHandler = (key) => {
    const state = { ...this.state.isActive }

    for (let element in state) {
      element === key ? state[element] = true : state[element] = false;
    }

    this.setState({
      ...this.state,
      isActive: {
        ...state,
      }
    })
  }

  render() {
    const {
      constructor: isConstructorActive,
      list: isListActive,
      cabinet: isCabinetActive
    } = this.state.isActive;

    return (
      <header className={styles.header}>
        <div className={styles.navpanel}>
          <div className={styles.container_left}>
            <NavLink
              icon={<BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />}
              link='#'
              caption='Конструктор'
              isActive={isConstructorActive}
              onClick={() => this.clickHandler('constructor')}
            />
            <NavLink
              icon={<ListIcon type={isListActive ? 'primary' : 'secondary'} />}
              link='#'
              caption='Лента заказов'
              isActive={isListActive}
              onClick={() => this.clickHandler('list')}
            />
          </div>

          <Logo />

          <div className={styles.container_right}>
            <NavLink
              icon={<ProfileIcon type={isCabinetActive ? 'primary' : 'secondary'} />}
              link='#'
              caption='Личный кабинет'
              isActive={isCabinetActive}
              onClick={() => this.clickHandler('cabinet')}
            />
          </div>
        </div>
      </header>
    )
  }

}
