/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../redux/actions/authActions'
import styles from './Login.module.css'

export function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loginRequest } = useSelector(store => store.auth)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('');

  const { name } = useSelector(store => store.auth.user)

  useEffect(() => {
    if (name) {
      console.log('login, useEffect, location', location)
      const from = location.state?.from?.pathname || { from: { pathname: '/' } }
      console.log('from', from)
      navigate(from);
    }
  }, [name])

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  function onButtonClick(e) {
    console.log('Login onButtonClick, location.state', location.state);
    e.preventDefault();
    dispatch(login({ email, password }))
  }

  return (
    <form className={styles.form}>
      <p className="text text_type_main-medium">Вход</p>
      <Input value={email} onChange={onEmailChange} placeholder={'E-mail'} name={'email'}
        autocomplete="email" />
      <PasswordInput onChange={onPasswordChange} value={password} name={'password'}
        autocomplete="current-password" />
      <Button type="primary" size="medium" onClick={onButtonClick} disabled={loginRequest}>
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
