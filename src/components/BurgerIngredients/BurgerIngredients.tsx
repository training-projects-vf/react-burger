/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { categories } from '../../settings/categories';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory';
import { TCategory, TIngredient } from '../../types/types';

export function BurgerIngredients() {
  const { ingredients } = useSelector((store: any) => store.ingredients);
  const [current, setCurrent] = useState<string>('bun');
  const tabs = useRef<HTMLDivElement>(null!);

  // type TCategoryRef = HTMLParagraphElement;
  const categoryRefs = useRef<Array<any>>([]);

  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length);
  }, [])


  function handleTabClick(category: string) {
    setCurrent(category);
    const i = categories.findIndex((item: TCategory) => item.categoryMarker === category);
    categoryRefs.current[i].scrollIntoView({ behavior: 'smooth' });
  }

  function handleScroll() {
    const { y: tabsY } = tabs.current.getBoundingClientRect()
    const qty = categoryRefs.current.length;
    type TMin = {
      value: number;
      index: number;
    }
    let min: TMin = {
      value: 0,
      index: 0,
    };

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
              const categoryIngredients = ingredients
              .filter((ingredient: TIngredient) => ingredient.type === category.categoryMarker)
              return <IngredientsCategory
                // id={category}
                key={index}
                ref={(el) => categoryRefs.current[index] = el}
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
