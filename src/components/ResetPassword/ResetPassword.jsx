import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ResetPassword.module.css'

export function ResetPassword() {
  const [code, setName] = useState('');
  const [password, setPassword] = useState('');

  const onCodeChange = e => {
    setName(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <PasswordInput onChange={onPasswordChange} value={password} name={'password'}
        placeholder={'Введите новый пароль'} autocomplete="new-password" />
      <Input value={code} onChange={onCodeChange} placeholder={'Введите код из письма'} name={'code'}
        autocomplete="one-time-code" />

      <Button type="primary" size="medium" >
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
