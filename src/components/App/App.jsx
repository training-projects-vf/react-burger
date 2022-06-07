/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css'

import { getIngredients } from '../../redux/actions/getIngredientsActions';

import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';

function App() {
  const dispatch = useDispatch();
  const { isError, ingredientsRequestSuccess } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <main className={styles.main}>
      <AppHeader />

      {isError &&
        <Modal title="" >
          <Error />
        </Modal>
      }

      {ingredientsRequestSuccess &&

        <DndProvider backend={HTML5Backend} >
          <section className={styles.section_content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </DndProvider>

      }

    </main>
  );
}

export default App;
