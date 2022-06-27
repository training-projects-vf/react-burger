/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { submitNewPassword } from '../../utils/password/submitNewPassword';
import styles from './ResetPassword.module.css'

export function ResetPassword() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const from = location.state?.pathname || location.state;
    if (from !== '/forgot-password') {
      navigate('/login', { replace: true })
    }
  }, [])


  const onCodeChange = e => {
    setCode(e.target.value)
  }

  const onPasswordChange = e => {
    setNewPassword(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault();
    submitNewPassword(newPassword)
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <Input onChange={onPasswordChange} value={newPassword} name={'password'}
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
