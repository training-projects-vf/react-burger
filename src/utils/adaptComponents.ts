import { TIngredient, TComponent } from "../types/types";

export const adaptComponents = (components: string[], allIngredients: TIngredient[]) => {

  components.forEach((component, index) => {
    if (component === '' || component === undefined) {
      console.log('в проверке', components)
      components.splice(index, 1)
    }
  })

  const burgerComponents = components.map((component) => allIngredients
    .find((ingredient) => ingredient._id === component)) as TIngredient[];

  const uniqueComponents = Array.from(new Set(burgerComponents))

  const bun = uniqueComponents.find((component) => component.type === 'bun') as TIngredient
  const bunIndex = uniqueComponents.findIndex((component) => component.type === 'bun')

  if (uniqueComponents.length > 1) {
    uniqueComponents.splice(bunIndex, 1);
    uniqueComponents.unshift(bun);
  }

  const uniqueCompsWithQty: TComponent[] = uniqueComponents.map((component) => {
    // console.log('component', component)
    if (component._id === undefined) {
      console.log('flawed component', component)
    }

    const qty = burgerComponents.reduce((sum, item) => {
      if (!item._id) {
        console.log('flawed item', item)
      }
      if (component._id === item._id) {
        return sum + 1
      } else {
        return sum;
      }
    }, 0)
    return {
      ...component,
      qty: qty
    }
  })

  return uniqueCompsWithQty;
}
