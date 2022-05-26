/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './App.module.css'
import { AppHeader } from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { categories } from '../../utils/categories.js';
import getData from '../../utils/getData';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => { setIngredients(data.data) })
      .catch((err) => console.log(err));
  }, [])

  if (!ingredients.length) { return null }

  return (
    <main className={styles.main}>
      <AppHeader />

      <section className={styles.section_content}>
        <BurgerIngredients
          categories={categories}
          ingredients={ingredients}
        />

        <BurgerConstructor ingredients={ingredients} />
      </section>
    </main>
  );
}

export default App;
