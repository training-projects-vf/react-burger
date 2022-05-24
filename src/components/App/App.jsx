/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './App.module.css'
import { AppHeader } from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { categories } from '../../utils/categories.js';
import getData from '../../utils/getData';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isModalVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    getData()
      .then((data) => { setIngredients(data.data) })
      .catch((err) => console.log(err));
  }, [])

  const openPopup = () => {
    setIsPopupVisible(true)
  }

  const closePopup = () => {
    setIsPopupVisible(false)
  }

  if (!ingredients.length) { return null }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          categories={categories}
          ingredients={ingredients}
          openPopup={openPopup} />

        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
}

export default App;
