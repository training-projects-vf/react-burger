import styles from './HeaderItem.module.css';
import { navLinkType } from "../../utils/propTypes";
import { NavLink } from 'react-router-dom';

export function HeaderItem(props) {
  const { link, caption, icon, isActive, onClick } = props;

  return (
    <NavLink to={link} className={styles.navlink} >

      <div className={styles.container} onClick={onClick}>
        {icon}
        <p
          className={`text text_type_main-default ${styles.caption} ${isActive ? styles.caption_active : 'text_color_inactive'}`}
        >
          {caption}
        </p>
      </div>
    </NavLink>
  )
}

HeaderItem.propTypes = navLinkType;
