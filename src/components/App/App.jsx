import styles from './App.module.css'
import { AppHeader } from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { categories } from '../../utils/categories.js';
import { ingredients } from '../../utils/data.js';


function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients categories={categories} ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </>
  );
}

export default App;
