/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css'

import { getIngredients } from '../../redux/actions/ingredientsActions';

import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';

function App() {
  const dispatch = useDispatch();
  const { isError, errorMessage, isSuccess } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  return (
    <main className={styles.main}>
      <AppHeader />

      {isSuccess &&

        <DndProvider backend={HTML5Backend} >
          <section className={styles.section_content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </DndProvider>
      }

      {isError &&
        <Modal title="" >
          <Error errorMessage={errorMessage} />
        </Modal>
      }

    </main>
  );
}

export default App;
