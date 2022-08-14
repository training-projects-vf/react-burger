import { useSelector } from "../../redux/store";
import { useDrag } from "react-dnd";
import styles from "./Ingredient.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../types/types";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  item: TIngredient;
}

interface ICounter {
  _id: string;
  qty: number;
}

export const Ingredient = (props: IProps) => {
  const location = useLocation();

  const { counter } = useSelector((store) => store.burger);
  const { item: ingredient } = props;

  const searchRes = counter.find(
    (item: ICounter) => item._id === ingredient._id
  );
  const qty = searchRes ? searchRes.qty : null;

  const [, draggableIngredientRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  return (
    <Link
      key={ingredient._id}
      className={styles.link}
      to={`/ingredients/${ingredient._id}`}
      state={{ backgroundLocation: location }}
      ref={draggableIngredientRef}
      data-type-cy={`${ingredient.type}`} //another way to select further in Cypress-tests
    >
      <div
        className={styles.container_ingredient}
      >
        <img src={ingredient.image} alt="ingredient" />

        {qty && <Counter count={qty} size="default" />}
        <div className={styles.container_price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.name}`}>
          {ingredient.name}
        </p>
      </div>
    </Link>
  );
};
