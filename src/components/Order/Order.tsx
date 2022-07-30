import { useParams } from "react-router-dom"
import { useSelector } from "../../redux/store"
import { TIngredient, TOrder } from "../../types/types"
import { calcPrice } from "../../utils/calcPrice"
import { getDayTimeString } from "../../utils/getDayTimeString"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

type TComponent = TIngredient & {
  qty: number;
}

export const Order = () => {
  const { id } = useParams();
  const idNum = Number(id);
  const { orders } = useSelector((store) => store.feed.data);
  const { ingredients: allIngredients } = useSelector((store) => store.ingredients);
  const order = orders.find((order) => order.number === idNum) as TOrder;
  const { number, name, ingredients: components, status, createdAt } = order;
  const burgerComponents = components.map((component) => allIngredients
    .find((ingredient) => ingredient._id === component)) as TIngredient[];

  console.log('components', burgerComponents)

  return (
    <section>
      <span className="text text_type_main-default">{number}</span>
      <span className="text text_type_main-medium">{name}</span>
      <span className="text text_type_main-default">{status}</span>
      {
        components.map((component, index) => {
          return (
            <p key={index}>{component}</p>
          )
        })
      }
      <section>

        <span>{getDayTimeString(createdAt)}</span>
        <div>

          <span>{calcPrice(burgerComponents)}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </section>
  )
}
