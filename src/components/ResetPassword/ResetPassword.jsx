import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitNewPassword } from '../../utils/password/submitNewPassword';
import styles from './ResetPassword.module.css'

export function ResetPassword() {
  const [code, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onCodeChange = e => {
    setName(e.target.value)
  }

  const onPasswordChange = e => {
    setNewPassword(e.target.value)
  }

  const onButtonClick = e => {
    e.preventDefault();
    submitNewPassword(newPassword)
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input onChange={onPasswordChange} value={newPassword} name={'password'}
        placeholder={'Введите новый пароль'} autocomplete="new-password" />
      <Input value={code} onChange={onCodeChange} placeholder={'Введите код из письма'} name={'code'}
        autocomplete="one-time-code" />

      <Button type="primary" size="medium" onClick={onButtonClick} >
        Сохранить
      </Button>
      <section className={styles.options}>
        <p className={`text text_type_main-default ${styles.color}`}>
          Вспомнили пароль?
          <Link to='/login' className={styles.link}>  Войти</Link>
        </p>
      </section>
    </form>
  )
}
