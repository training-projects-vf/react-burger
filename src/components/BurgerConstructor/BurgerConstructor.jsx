import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/propTypes';
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { useState } from 'react';


const BurgerConstructor = (props) => {
  const { ingredients } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function onClose() {
    setIsPopupOpen(false);
  }

  function onClick(e) {
    setIsPopupOpen(true)
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container_first_last}>
          <ConstructorElement type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={ingredients[0].image}
            key={'top'}
          />
        </div>

        <div className={`${styles.section_list} custom-scroll`}>
          {ingredients.map((item) => {
            return (
              <div className={styles.container} key={item._id}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            )
          })}
        </div>

        <div className={styles.container_first_last}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={ingredients[0].image}
          />
        </div>

        <div className={styles.container_price}>
          <p className="text text_type_digits-medium">
            610
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={onClick}>Оформить заказ</Button>
        </div>
      </section>

      <OrderDetails
        isOpen={isPopupOpen}
        onClose={onClose}
      />
    </>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}

export default BurgerConstructor;
