import { TComponent } from "../types/types";

export const calcPrice = (components: TComponent[]) => {

  const price = components.reduce((burgerPrice, component) => {
    let { price, qty } = component;
    return burgerPrice += qty * price;
  }, 0)

  return price;
}
