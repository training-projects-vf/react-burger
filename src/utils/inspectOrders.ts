/* eslint-disable array-callback-return */
import { TIngredient, TOrder } from "../types/types";

//function checks orders in order to remove incorrect ones
export const inspectOrders = (orders: TOrder[], allIngredients: TIngredient[]) => {
  const allIngredientsIds = allIngredients.map((ingredient) => ingredient._id)

  const inspectedOrders = orders.filter((order, index) => {
    let { ingredients: burgerIngredients } = order;

    if (burgerIngredients.length === 0) {
      console.log('flawed order', index, order)
      return false
    }

    const idsVerificationResults = burgerIngredients.map((ingredient) => {
      return allIngredientsIds.includes(ingredient)
    })

    if (idsVerificationResults.includes(false)) {
      console.log('flawed order', index, order)
      return false
    }

    return true
  })

  // console.log('inspected orders', inspectedOrders)
  return inspectedOrders
}
