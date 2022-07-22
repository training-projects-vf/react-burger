/* eslint-disable react-hooks/exhaustive-deps */
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/store';
import { AnyAction } from 'redux';
import { updateUserInfo } from '../../redux/actions/authActions';
import styles from './Profile.module.css';

export function Profile() {
  const dispatch = useDispatch();
  const { name: currentName, email: currentEmail } = useSelector((store) => store.auth.user);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const showButtons = currentName !== newName || currentEmail !== newEmail || newPassword !== ''

  useEffect(() => {
    if (currentName !== undefined) {
      setNewName(currentName);
    }
    if (currentEmail !== undefined) {
      setNewEmail(currentEmail);
    }
  }, [])

  const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewName(e.currentTarget.value)
  }

  const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewEmail(e.currentTarget.value)
  }

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setNewPassword(e.currentTarget.value)
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
     if (currentName !== undefined) {
      setNewName(currentName);
    }
    if (currentEmail !== undefined) {
      setNewEmail(currentEmail);
    }
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
