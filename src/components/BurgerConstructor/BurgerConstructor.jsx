import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { addIngredient, removeIngredient, placeOrder } from '../../redux/actions/burgerConstructorActions';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { TopBunBibb, FillingBibb, BottomBunBibb } from '../ConstructorBibb/ConstructorBibb';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { success: isOrderAccepted, name: burgerName } = useSelector(store => store.burger.orderData)
  const { bun, fillings, burgerCost, ingredientIds } = useSelector(store => store.burger);
  const { ingredients } = useSelector(store => store.ingredients);
  const [isBunBibb, setBunBibb] = useState(true);
  const [isFillingBibb, setFillingBibb] = useState(true);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      const item = ingredients.find((ingredient) => ingredient._id === itemId.id)
      dispatch(addIngredient(item))
    }
  })

  useEffect(() => {
    setIsPopupOpen(isOrderAccepted ? true : false)
  }, [isOrderAccepted])

  useEffect(() => {
    setFillingBibb(fillings.length === 0 ? true : false)
  }, [fillings])

  useEffect(() => {
    setBunBibb(bun.length === 0 ? true : false)
  }, [bun])

  function handleClose(index) {
    dispatch(removeIngredient(index));
  }

  function handleButtonClick() {
    dispatch(placeOrder(ingredientIds))
  }

  function onClose() {
    setIsPopupOpen(false);
  }

  function onClick(e) {
    setIsPopupOpen(true)
  }

  return (
    <>
      <section ref={dropTarget} className={styles.section}>
        {isBunBibb
          ?
          <TopBunBibb />
          :
          <div className={styles.container_bun}>
            <ConstructorElement type="top"
              isLocked={true}
              text={bun[0].name + ` (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image ? bun[0].image : null}
              key={'top'}
            />
          </div>}

        {isFillingBibb
          ?
          <FillingBibb />
          :
          <div className={`${styles.section_list} custom-scroll`}>
            {fillings.map((filling, index) => {
              return (
                <div className={styles.container} key={filling.uuid}>
                  <DragIcon />
                  <ConstructorElement
                    text={filling.name}
                    price={filling.price}
                    thumbnail={filling.image}
                    handleClose={() => handleClose(index)}
                  />
                </div>
              )
            })}
          </div>
        }

        {isBunBibb
          ?
          <BottomBunBibb />
          :
          <div className={styles.container_bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun[0].name + ' (низ)'}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        }

        <div className={styles.container_price}>
          <p className="text text_type_digits-medium">
            {burgerCost}
            <CurrencyIcon type="primary" />
          </p>
          <Button
            type="primary"
            size="large"
            onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {isPopupOpen &&
        <Modal title="" onClose={onClose} >
          <OrderDetails />
        </Modal>}

    </>
  )
}
