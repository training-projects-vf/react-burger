/* eslint-disable array-callback-return */
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../redux/store';
import { getDayTimeString } from '../../utils/getDayTimeString';
import styles from './OrderCard.module.css'

type TProps = {
  number: number,
  name: string,
  components: string[]
  createdAt: string;
}

export const OrderCard = (props: TProps) => {
  const { number, name, components, createdAt } = props;
  const { ingredients: allIngredients } = useSelector((store) => store.ingredients);

  const burgerComponents = allIngredients.filter((item) => components.find((id) => id === item._id))
  const burgerPrice = burgerComponents.reduce((burgerPrice, component) => {
    let { type, price } = component;
    if (type === 'bun') {
      price = price * 2;
    }
    return burgerPrice += price;
  }, 0)

  // burgerComponents.reverse();

  type TComponentImage = {
    _id: string,
    name: string,
    image_mobile: string,
    opacity: boolean;
  }

  let componentsImages: TComponentImage[] = [];

  componentsImages = burgerComponents.map((item) => {
    return {
      _id: item._id,
      name: '',
      image_mobile: item.image_mobile,
      opacity: false,
    }
  });

  if (componentsImages.length > 6) {
    componentsImages[5] = {
      ...componentsImages[5],
      name: `+${componentsImages.length - 5}`,
      opacity: true,
    }
    componentsImages = componentsImages.slice(0, 6)
  }

  componentsImages.reverse()

  return (
    <div className={styles.card}>
      <section className={styles.number_time_box}>
        <span className="text text_type_main-default">#{number}</span>
        <span className={`text text_type_main-small ${styles.time}`}>{getDayTimeString(createdAt)}</span>
      </section>

      <div className={styles.name_div}>
        <p className="text text_type_main-medium">{name}</p>
      </div>

      <section className={styles.components_price_box}>
        <div className={styles.images_div}>
          {
            componentsImages.map((item) => {
              return (
                <div className={styles.image_box}
                  key={item._id}
                >
                  <img
                    src={item.image_mobile}
                    alt='ingredient'
                    className={`${item.opacity ? styles.image_opacity : ''}`}
                  />
                  <span className={`text text_type_main-default ${styles.qty}`}>{item.name}</span>
                </div>
              )
            })
          }
        </div>

        <div className={styles.price}>
          <span className={"text text_type_digits-default"}>
            {`${burgerPrice}  `}
          </span>
          <CurrencyIcon type="primary" />
        </div>

      </section>
    </div>
  )
}
