/* eslint-disable react-hooks/exhaustive-deps */
import { EditIcon, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authActions'
import styles from './Profile.module.css'

export function Profile() {
  const dispatch = useDispatch();
  const { name, email } = useSelector(store => store.auth.user);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    setEditedName(name);
    setEditedEmail(email);
  }, [])

  const [newPassword, setNewPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onExitClick = e => {
    console.log('onExitClick');
    e.preventDefault()
    dispatch(logout());
  }

  const onHideIconClick = e => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  const handleNameChange = e => {
    e.preventDefault()
    setEditedName(e.target.value)
  }

  const handleEmailChange = e => {
    e.preventDefault()
    setEditedEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    e.preventDefault()
    setNewPassword(e.target.value)
  }

  return (
    <div className={styles.profile}>
      <section className={styles.section_menu}>
        <ul>
          <li>
            <Link to='/profile' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mt-5 mb-9`}>
                Профиль
              </p>
            </Link>
          </li>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mb-9`} >
                История заказов
              </p>
            </Link>
          </li>
          <li>
            <Link to='#' className={styles.link}>
              <p className={`text text_type_main-medium ${styles.color} mb-20`} onClick={onExitClick} >
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
        <Input value={editedName} placeholder={'Имя'} name={'name'} onChange={handleNameChange} icon={'EditIcon'}
          autocomplete="name">
          <EditIcon />
        </Input>
        <EmailInput value={editedEmail} placeholder={'Логин'} name={'login'} onChange={handleEmailChange}
          autocomplete="email" >
          {/* <EditIcon /> */}
        </EmailInput>
        <Input
          value={newPassword}
          placeholder={'Пароль'}
          name={'password'}
          onChange={handlePasswordChange}
          // icon={'HideIcon'}
          autocomplete="new-password"
        >
          <EditIcon />
        </Input>
      </form>
    </div>

  )
}
