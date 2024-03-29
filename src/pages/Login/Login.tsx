/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from '../../redux/store'
import { Link, Location, useLocation, useNavigate } from 'react-router-dom'
import { login, LOGIN_REJECTION_RESET } from '../../redux/actions/authActions'
import { Modal } from '../../components/Modal/Modal'
import { Error } from '../../components/Error/Error'
import styles from './Login.module.css'
import { FormEvent } from 'react'

export function Login() {
  interface ILocationState extends Location {
    state: {
      from?: {
        pathname?: string;
      }
    }
  }
  const location = useLocation() as ILocationState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginRequest, isLoggedIn } = useSelector((store) => store.auth);
  const { loginRejectionMessage } = useSelector((store) => store.auth);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const from = location.state?.from?.pathname || '/'
      navigate(from);
    }
  }, [isLoggedIn])

  const onPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const onEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login({ email, password }))
  }

  function onClose() {
    dispatch({ type: LOGIN_REJECTION_RESET })
  }

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <p className="text text_type_main-medium">Вход</p>
        <Input value={email} onChange={onEmailChange} placeholder={'E-mail'} name={'email'} />

        <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />

        <Button type="primary" size="medium" disabled={loginRequest}>
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

      {loginRejectionMessage && (
        <Modal title='' onClose={onClose} closeIcon={true} >
          <Error
            errorMessage={loginRejectionMessage}
          />
        </Modal>
      )}
    </>
  )
}
