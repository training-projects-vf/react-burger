import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/authActions';
import { Error } from '../Error/Error';
import { Modal } from '../Modal/Modal';
import styles from './Registration.module.css'
import { REG_ERROR_RESET } from '../../redux/actions/authActions';

export function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { regRequest, isRegError, regErrorMessage } = useSelector(store => store.auth);

  const onNameChange = e => {
    setName(e.target.value)
  }

  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const onButtonClick = e => {
    e.preventDefault()
    dispatch(register({ name, email, password }))
  }

  const onModalClose = () => {
    dispatch({ type: REG_ERROR_RESET })
  }

  return (
    <>

      <form className={styles.form}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input value={name} onChange={onNameChange} placeholder={'Имя'} name={'email'}
          autocomplete="name" />
        <Input value={email} onChange={onEmailChange} placeholder={'E-mail'} name={'email'}
          autocomplete="email" />
        <PasswordInput onChange={onPasswordChange} value={password} name={'password'}
          autocomplete="new-password" />
        <Button type="primary" size="medium" onClick={onButtonClick}
          disabled={regRequest} >
          Зарегистрироваться
        </Button>
        <section className={styles.options}>
          <p className={`text text_type_main-default ${styles.color}`}>
            Уже зарегистрированы?
            <Link to='/login' className={styles.link}>  Войти</Link>
          </p>
        </section>
      </form>

      {isRegError && (
        <Modal title="" onClose={onModalClose} >
          <Error errorMessage={regErrorMessage} />
        </Modal>
      )}

    </>
  )
}
