import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ForgotPassword.module.css'

export function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input value={email} onChange={onEmailChange} placeholder={'Укажите e-mail'} name={'email'}
        autocomplete="email" />
      <Button type="primary" size="medium" >
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
