import { useSelector, useDispatch } from '../../redux/store';
import { useDrop } from 'react-dnd';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import { addIngredient, placeOrder, RESET_ORDER_DATA, MOVE_FILLINGS, RESET_BURGER } from '../../redux/actions/burgerConstructorActions';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { Error } from '../Error/Error';
import { TopBunBibb, FillingBibb, BottomBunBibb } from '../ConstructorBibb/ConstructorBibb';
import { Filling } from '../Filling/Filling';
import { Preloader } from '../Preloader/Preloader';
import { useNavigate } from 'react-router-dom';
import { TFilling, TIngredient } from '../../types/types';
import { checkAuthorization } from '../../redux/actions/authActions';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRequest, success: isOrderAccepted } = useSelector((store) => store.burger.orderData)
  const { isError, errorMessage } = useSelector((store) => store.burger.orderData.error)
  const { bun, fillings, burgerCost, ingredientIds } = useSelector((store) => store.burger);
  const { ingredients } = useSelector((store) => store.ingredients);
  const { isLoggedIn } = useSelector((store) => store.auth);

  const isBunBibb = bun.length === 0;
  const isFillingBibb = fillings.length === 0;
  const allowOrder = bun.length !== 0 || fillings.length !== 0 ? true : false

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId: { id: string }) {
      const item = ingredients.find((ingredient: TIngredient) => ingredient._id === itemId.id)
      dispatch(addIngredient(item as TIngredient))
    }
  })

  function handleButtonClick() {
    if (!isLoggedIn) {
      return navigate('/login')
    }
    dispatch(checkAuthorization())
    dispatch(placeOrder(ingredientIds))
  }

  function onCloseModal() {
    dispatch({ type: RESET_ORDER_DATA })
    dispatch({ type: RESET_BURGER })
  }

  function moveCard(dragIndex: number, hoverIndex: number) {
    dispatch({ type: MOVE_FILLINGS, payload: { dragIndex, hoverIndex } })
  }

  return (
    <>
      <section ref={dropTarget} data-cy='constructor' className={styles.section}>
        {isBunBibb
          ?
          <TopBunBibb />
          :
          <div data-cy='constructor-bun-1' className={styles.container_bun}>
            <ConstructorElement type="top"
              isLocked={true}
              text={bun[0].name + ` (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image ? bun[0].image : ''}
              key={'top'}
            />
          </div>}

        {isFillingBibb
          ?
          <FillingBibb />
          :
          <div
            className={`${styles.section_list} custom-scroll`}
            data-cy='constructor-ingredients'
          >
            {fillings.map((filling: TFilling, index: number) => {
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
          <div className={styles.container_bun} data-cy="constructor-bun-2">
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
          <div className={styles.container_misc}>
            <p className="text text_type_digits-medium">
              {burgerCost}
              <CurrencyIcon type="primary" />
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            disabled={!allowOrder}
            onClick={handleButtonClick}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isRequest &&
        <Modal title="" closeIcon={false}>
          <Preloader message="PROCESSING YOUR ORDER..." />
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
