import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { initPasswordReset } from '../../utils/password/initPasswordReset';
import styles from './ForgotPassword.module.css'

export function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    initPasswordReset()
      .then(() => navigate('/reset-password', { state: location }))
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input value={email} onChange={onEmailChange} placeholder={'Укажите e-mail'} name={'email'}
        autocomplete="email" />
      <Button type="primary" size="medium">
        Восстановить
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
