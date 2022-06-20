import styles from './NavLink.module.css';
import { navLinkType } from "../../utils/propTypes";

export function NavLink(props) {
  const { link, caption, icon, isActive, onClick } = props;

  return (
    <div className={styles.container} onClick={onClick}>
      {icon}
      <a
        className={`text text_type_main-default ${styles.caption} ${isActive ? styles.caption_active : 'text_color_inactive'}`}
        href={link}
      >
        {caption}
      </a>
    </div>
  )
}

NavLink.propTypes = navLinkType;
