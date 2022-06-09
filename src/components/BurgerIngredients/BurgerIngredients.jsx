/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { categories } from '../../utils/categories.js';
import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory.jsx';

export function BurgerIngredients() {
  const { ingredients } = useSelector(store => store.ingredients);
  const [current, setCurrent] = useState('bun');
  const categoryRefs = useRef([]);
  const tabs = useRef(null);

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length);
  }, [])


  function handleTabClick(category) {
    setCurrent(category);
    const i = categories.findIndex((item) => item.categoryMarker === category);
    categoryRefs.current[i].scrollIntoView({ bevahior: 'smooth' });
  }

  function handleScroll() {
    const { y: tabsY } = tabs.current.getBoundingClientRect()
    const qty = categoryRefs.current.length;
    let min = {};

    for (let i = 0; i < qty; i++) {
      const { y: titleY } = categoryRefs.current[i].getBoundingClientRect();
      const distance = Math.abs(titleY - tabsY);
      if (i === 0) {
        min = {
          value: distance,
          index: i,
        }
      } else {
        if (distance < min.value) {
          min = {
            value: distance,
            index: i,
          }
        }
      }
    }
    setCurrent(categories[min.index].categoryMarker)
  }

  return (
    <>
      <section className={styles.section}>
        <p className="text text_type_main-large">Соберите бургер</p>

        <div ref={tabs} className={styles.div_tabs}>
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

        <section
          onScroll={handleScroll}
          className={`custom-scroll ${styles.section_ingredients}`}
        >

          {
            categories.map((category, index) => {
              const categoryIngredients = ingredients.filter((ingredient) => ingredient.type === category.categoryMarker)
              return <IngredientsCategory
                id={category}
                key={index}
                ref={el => categoryRefs.current[index] = el}
                category={category}
                categoryIngredients={categoryIngredients}
              />
            })
          }
        </section>
      </section>
    </>
  )
}
