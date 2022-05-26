import { createPortal } from 'react-dom';
import { Modal } from '../Modal/Modal.jsx'
import styles from './IngredientDetails.module.css'

export function IngredientDetails(props) {
  const modalRoot = document.getElementById('modal-root')
  const { ingredient } = props;

  console.log('ingredient', ingredient);

  return createPortal(
    <Modal
      title="Детали ингредиента"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <section className={styles.section}>

        <img src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
        <div className={styles.container_nutrition_values}>
          <div className={styles.value}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
          </div>
          <div className={styles.value}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
          </div>

        </div>
      </section>
    </Modal>,
    modalRoot
  )
}
