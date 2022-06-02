/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './App.module.css'
import { AppHeader } from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import getData from '../../utils/getData';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getData()
      .then((data) => {
        setIngredients(data.data);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true)
      });
  }, [])

  if (ingredients.length === 0 || isError) {
    return (
      <Modal title="" >
        <Error />
      </Modal>
    )
  }

  return (
    <main className={styles.main}>
      <AppHeader />

      <section className={styles.section_content}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </section>
    </main>
  );
}

export default App;
