/* eslint-disable react-hooks/exhaustive-deps */
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux';
import { updateUserInfo } from '../../redux/actions/authActions';
import styles from './Profile.module.css'

export function Profile() {
  const dispatch = useDispatch();
  const { name: currentName, email: currentEmail } = useSelector((store: any) => store.auth.user);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const showButtons = currentName !== newName || currentEmail !== newEmail || newPassword !== ''

  useEffect(() => {
    setNewName(currentName);
    setNewEmail(currentEmail);
  }, [])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewPassword(e.target.value)
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    type TUserInfo = {
      name: string;
      email: string;
      newPassword?: string | null;
    }
    const userInfo: TUserInfo = {
      name: newName,
      email: newEmail,
      'newPassword': newPassword === '' ? null : newPassword,
    }
    dispatch(updateUserInfo(userInfo) as unknown as AnyAction)
  }

  const onCancelClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setNewName(currentName);
    setNewEmail(currentEmail);
  }

  return (
    <form onSubmit={onSubmit} className={styles.form_profile}>
      <Input
        value={newName}
        placeholder={'Имя'}
        name={'name'}
        onChange={handleNameChange}
        icon={'EditIcon'}
        // autocomplete="name"
      />
      <EmailInput
        value={newEmail}
        // placeholder={'Логин'}
        name={'login'}
        onChange={handleEmailChange}
        // autocomplete="email"
      />
      <Input
        value={newPassword}
        placeholder={'Пароль'}
        name={'password'}
        onChange={handlePasswordChange}
        icon={'HideIcon'}
        // autocomplete="new-password"
      />
      {showButtons && (
        <section className={styles.button_section}>
          <Button type="secondary" size="medium" onClick={onCancelClick}>Отмена</Button>
          <Button>Сохранить</Button>
        </section>
      )}

    </form>
  )
}
