import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { categories } from '../../utils/categories.js';
import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory.jsx';

export function BurgerIngredients() {
  const { ingredients } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState('bun');
  const categoryRefs = useRef([])

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length)
  }, [])

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
              const categoryIngredients = ingredients.filter((ingredient) => ingredient.type === item.categoryMarker)
              return <IngredientsCategory
                key={index}
                ref={el => categoryRefs.current[index] = el}
                category={item}
                categoryIngredients={categoryIngredients}
              />
            })
          }
        </section>
      </section>
    </>
  )
}
