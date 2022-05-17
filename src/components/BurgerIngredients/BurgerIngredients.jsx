import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsCategory } from '../IngredientsCategory/IngredientsCategory.jsx';
import { ingredientsPropTypes, categoriesPropTypes } from '../../utils/propTypes.js';

function BurgerIngredients(props) {
  const { categories, ingredients } = props;
  const [current, setCurrent] = React.useState('one')

  return (
    <section className={styles.section}>
      <p className="text text_type_main-large">Соберите бургер</p>

      <div style={{ display: 'flex' }}>
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

      <div className="custom-scroll" style={{ "overflowY": "scroll" }}>
        {
          categories.map((item, index) => {
            return <IngredientsCategory key={index} category={item} ingredients={ingredients} />
          })
        }
      </div>

    </section>
  )

}

BurgerIngredients.propTypes = ({
  categories: categoriesPropTypes,
  ingredients: ingredientsPropTypes,
});

export default BurgerIngredients;
