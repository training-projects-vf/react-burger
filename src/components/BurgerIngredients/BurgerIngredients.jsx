import { useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory.jsx';
import PropTypes from 'prop-types';
import { ingredientType, categoryType } from '../../utils/propTypes.js';
import { Modal } from '../Modal/Modal';

function BurgerIngredients(props) {
  const { categories, ingredients } = props;
  const [current, setCurrent] = useState('one');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function closePopup() {
    setIsPopupOpen(false);
  }

  function openPopup() {
    setIsPopupOpen(true)
  }

  return (
    <>
      <section className={styles.section}>
        <p className="text text_type_main-large">Соберите бургер</p>

        <div className={styles.div_tabs}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Coусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>

        <section className={`custom-scroll ${styles.section_ingredients}`}>
          {
            categories.map((item, index) => {
              return <IngredientsCategory
                key={index}
                category={item}
                ingredients={ingredients}
                openPopup={openPopup} />
            })
          }
        </section>

      </section>

      <Modal isOpen={isPopupOpen} />

    </>
  )

}

BurgerIngredients.propTypes = ({
  categories: PropTypes.arrayOf(categoryType).isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
});

export default BurgerIngredients;
