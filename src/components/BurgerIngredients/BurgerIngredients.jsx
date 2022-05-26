import { useEffect, useState, useRef } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory.jsx';
import PropTypes from 'prop-types';
import { ingredientType, categoryType } from '../../utils/propTypes.js';

function BurgerIngredients(props) {
  const { categories, ingredients } = props;
  const [current, setCurrent] = useState('one');
  const categoryRefs = useRef([])

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length)
  }, [categories])

  function handleTabClick(category) {
    setCurrent(category);
    const i = categories.findIndex((item) => item.categoryMarker === category);
    categoryRefs.current[i].scrollIntoView({ bevahior: 'smooth' });
  }

  return (
    <>
      <section className={styles.section}>
        <p className="text text_type_main-large">Соберите бургер</p>

        <div className={styles.div_tabs}>
          <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
            Coусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
            Начинки
          </Tab>
        </div>

        <section className={`custom-scroll ${styles.section_ingredients}`}>
          {
            categories.map((item, index) => {
              return <IngredientsCategory
                key={index}
                ref={el => categoryRefs.current[index] = el}
                category={item}
                ingredients={ingredients}
              />
            })
          }
        </section>
      </section>
    </>
  )
}

BurgerIngredients.propTypes = ({
  categories: PropTypes.arrayOf(categoryType).isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
});

export default BurgerIngredients;
