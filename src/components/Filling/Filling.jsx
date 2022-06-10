import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../redux/actions/burgerConstructorActions';
import styles from './Filling.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


export const Filling = (props) => {
  const { index, moveCard } = props;
  const { uuid, name, price, image } = props.filling;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'filling',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: { uuid, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const opacity = isDragging ? 0 : 1;
  // функция в функции, в функции создает реф "3 в одном" и для драга, и для дропа и для элемента
  // это нужно, т.к. мы тянем "карточку", которую потом дропаем на "карточку"
  drag(drop(ref))

  function handleClose(index) {
    dispatch(removeIngredient(index));
  }

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ opacity }}
    >
      <DragIcon />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleClose(index)}
      />
    </div>
  )
}
