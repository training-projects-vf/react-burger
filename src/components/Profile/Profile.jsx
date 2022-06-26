/* eslint-disable react-hooks/exhaustive-deps */
import { Button, EditIcon, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from '../../redux/actions/authActions';
import styles from './Profile.module.css'

export function Profile() {
  const dispatch = useDispatch();
  const { name: currentName, email: currentEmail } = useSelector(store => store.auth.user);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const showButtons = currentName !== newName || currentEmail !== newEmail || newPassword !== ''

  useEffect(() => {
    setNewName(currentName);
    setNewEmail(currentEmail);
  }, [])

  const handleNameChange = e => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleEmailChange = e => {
    e.preventDefault()
    setNewEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    e.preventDefault()
    setNewPassword(e.target.value)
  }

  const onSaveClick = e => {
    e.preventDefault();
    const userInfo = {
      name: newName,
      email: newEmail,
      [newPassword === '' ? null : 'password']: newPassword === '' ? null : newPassword,
    }
    dispatch(updateUserInfo(userInfo))
  }

  const onCancelClick = e => {
    e.preventDefault();
    setNewName(currentName);
    setNewEmail(currentEmail);
  }

  return (
    <form className={styles.form_profile}>
      <Input value={newName} placeholder={'Имя'} name={'name'} onChange={handleNameChange} icon={'EditIcon'}
        autocomplete="name">
        <EditIcon />
      </Input>
      <EmailInput value={newEmail} placeholder={'Логин'} name={'login'} onChange={handleEmailChange}
        autocomplete="email" >
      </EmailInput>
      <Input
        value={newPassword}
        placeholder={'Пароль'}
        name={'password'}
        onChange={handlePasswordChange}
        icon={'HideIcon'}
        autocomplete="new-password"
      >
        <EditIcon />
      </Input>
      {showButtons && (
        <section className={styles.button_section}>
          <Button onClick={onCancelClick}>Отмена</Button>
          {/* <p className={`text text_type_main-default ${styles.cancel_button}`}>Отмена</p> */}
          <Button onClick={onSaveClick}>Сохранить</Button>
        </section>
      )}

    </form>
  )
}
