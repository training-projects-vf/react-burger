import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Registration.module.css'

export function Registration() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onNameChange = e => {
    setName(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Регистрация</p>
      <Input value={name} onChange={onNameChange} placeholder={'Имя'} name={'email'}
        autocomplete="name" />
      <Input value={email} onChange={onEmailChange} placeholder={'E-mail'} name={'email'}
        autocomplete="email" />
      <PasswordInput onChange={onPasswordChange} value={password} name={'password'}
        autocomplete="new-password" />
      <Button type="primary" size="medium" >
        Зарегистрироваться
      </Button>
      <section className={styles.options}>
        <p className={`text text_type_main-default ${styles.color}`}>
          Уже зарегистрированы?
          <Link to='/login' className={styles.link}>  Войти</Link>
        </p>
      </section>
    </form>
  )
}
