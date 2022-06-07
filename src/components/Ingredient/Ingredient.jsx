import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import styles from './Ingredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Ingredient = (props) => {
  const { counter } = useSelector(store => store.burger);
  const { item: ingredient, handleClick } = props;

  const searchRes = counter.find((item) => item._id === ingredient._id);
  const qty = searchRes ? searchRes.qty : null;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id: ingredient._id },
  })

  return (
    <div
      className={styles.container_ingredient}
      onClick={(e) => handleClick(ingredient)}
      ref={dragRef}
    >
      <img src={ingredient.image} alt="ingredient" />

      {qty && <Counter
        count={qty}
        size="default" />}
      <div className={styles.container_price}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
    </div>
  )
}
