import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { addIngredient, placeOrder, RESET_ORDER_DATA, MOVE_FILLINGS } from '../../redux/actions/burgerConstructorActions';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';
import { TopBunBibb, FillingBibb, BottomBunBibb } from '../ConstructorBibb/ConstructorBibb';
import { Filling } from '../Filling/Filling';
import { Preloader } from '../Preloader/Preloader'

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { isRequest, success: isOrderAccepted } = useSelector(store => store.burger.orderData)
  const { isError, errorMessage } = useSelector(store => store.burger.orderData.error)
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
    setFillingBibb(fillings.length === 0 ? true : false)
  }, [fillings])

  useEffect(() => {
    setBunBibb(bun.length === 0 ? true : false)
  }, [bun])

  function handleButtonClick() {
    dispatch(placeOrder(ingredientIds))
  }

  function onCloseModal() {
    dispatch({ type: RESET_ORDER_DATA })
  }

  function moveCard(dragIndex, hoverIndex) {
    dispatch({ type: MOVE_FILLINGS, payload: { dragIndex, hoverIndex } })
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
          <div
            className={`${styles.section_list} custom-scroll`}
          >
            {fillings.map((filling, index) => {
              return (
                <Filling
                  key={filling.uuid}
                  index={index}
                  filling={filling}
                  moveCard={moveCard}
                />
              )
            }
            )}
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

      {isRequest &&
        <Modal title="" closeIcon={false}>
          <Preloader message="PROCESSING YOU ORDER..." />
        </Modal>}

      {isOrderAccepted &&
        <Modal title="" onClose={onCloseModal} closeIcon={true}>
          <OrderDetails />
        </Modal>}

      {isError &&
        <Modal title="" onClose={onCloseModal} closeIcon={false}>
          <Error errorMessage={errorMessage} />
        </Modal>
      }

    </>
  )
}
