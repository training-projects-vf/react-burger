/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import { useSelector } from "../../redux/store"
import { calcPrice } from "../../utils/calcPrice"
import { getDayTimeString } from "../../utils/getDayTimeString"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './Order.module.css'
import { adaptComponents } from "../../utils/adaptComponents"
import { Preloader } from "../Preloader/Preloader"
import { useEffect } from "react"
import { useDispatch } from "../../redux/store"
import { getOrderById } from "../../redux/actions/historyActions"
import { ERequestStatus } from '../../redux/reducers/historyReducer'
import { Error } from "../Error/Error"
import { Modal } from "../Modal/Modal"
import { getIngredients } from "../../redux/actions/ingredientsActions"

export const Order = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const order = useSelector((store) => store.history.order);
  const { number, name, ingredients: components, status, createdAt } = order;
  const {
    ingredients: allIngredients,
    isSuccess: isIngredientsSuccess,
    ingredientsRequest,
    isError: isIngredientsError
  } = useSelector((store) => store.ingredients);
  const { requestStatus } = useSelector((store) => store.history)

  useEffect(() => {
    dispatch(getOrderById(id as string))
    dispatch(getIngredients())
  }, [])

  const ruStatus = status === 'done'
    ? 'Готов'
    : status === 'pending'
      ? 'В работе'
      : status === 'created'
        ? 'Создан'
        : 'Не определен...'

  console.log('components, allIngredients', components, allIngredients)
  const adaptedComponents = adaptComponents(components, allIngredients)

  if (requestStatus === ERequestStatus.IDLE || isIngredientsSuccess === false) {
    return null
  }

  if (requestStatus === ERequestStatus.PENDING || ingredientsRequest) {
    return (
      <Preloader message='' />
    )
  }

  if (requestStatus === ERequestStatus.FAILED || isIngredientsError) {
    return (
      <Modal
        closeIcon={true}
        title=''
      >
        <Error
          errorMessage='Ошибка на сервере... 🤷‍♂️'
        />
      </Modal>
    )
  }

  return (
    <section className={styles.order}>
      <span className={`text text_type_digits-default mb-6 ${styles.number}`}>#{number}</span>
      <span className="text text_type_main-medium mb-3">{name}</span>
      <span className={`text text_type_main-default mb-8 ${status === 'done' ? styles.status_done_color : ''}`}>{ruStatus}</span>
      <span className="text text_type_main-medium mb-5">Состав:</span>

      <section className={`custom-scroll ${styles.components_section}`}>
        {
          adaptedComponents.map((component, index) => {
            return (
              <div
                key={index}
                className={styles.component_container}
              >
                <div className={styles.image_name_div}>
                  <div className={styles.image_div}>
                    <img src={component.image_mobile} alt='component' />
                  </div>
                  <p className="text text_type_main-default">{component.name}</p>
                </div>
                <div className={styles.price_div}>
                  <span className="text text_type_main-default">{component.qty} x {component.price}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            )
          })
        }
      </section>

      <section className={styles.time_price_container}>
        <span className={`text text_type_main-default ${styles.time_color}`}>{getDayTimeString(createdAt)}</span>

        <div className={styles.price_div}>
          <span>{calcPrice(adaptedComponents)}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section>
  )
}
