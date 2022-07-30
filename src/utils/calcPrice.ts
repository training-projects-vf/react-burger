import { TIngredient } from "../types/types";

export const calcPrice = (components: TIngredient[]) => {

  const price = components.reduce((burgerPrice, component) => {
    let { type, price } = component;
    // if (type === 'bun') {
    //   price = price * 2;
    // }
    return burgerPrice += price;
  }, 0)

  return price;
}
