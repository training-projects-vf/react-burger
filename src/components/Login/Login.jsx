import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

export function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Вход</p>
      <Input value={email} onChange={onEmailChange} placeholder={'E-mail'} name={'email'}
        autocomplete="email" />
      <PasswordInput onChange={onPasswordChange} value={password} name={'password'}
        autocomplete="current-password" />
      <Button type="primary" size="medium" >
        Войти
      </Button>
      <section className={styles.options}>
        <p className={`text text_type_main-default ${styles.color}`}>
          Вы новый пользователь?
          <Link to='/registration' className={styles.link}>  Зарегистрироваться</Link>
        </p>

        <p className={`text text_type_main-default ${styles.color}`}>
          Забыли пароль?
          <Link to='/forgot-password' className={styles.link}>  Восстановить пароль</Link>
        </p>
      </section>
    </form>
  )
}
