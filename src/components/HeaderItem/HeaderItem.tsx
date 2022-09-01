import styles from './HeaderItem.module.css';
import { NavLink } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import { FC } from 'react';

interface IProps {
  link: string;
  caption: string;
  icon: TIconProps;
  isActive: boolean;
}

export const HeaderItem: FC<IProps> = (props) => {
  const { link, caption, icon, isActive } = props;

  return (
    <NavLink to={link} className={styles.navlink} >
      <div className={styles.container} >
        <>
          {icon}
          <p
            className={`text text_type_main-default ${styles.caption} ${isActive ? styles.caption_active : 'text_color_inactive'}`}
          >
            {caption}
          </p>
        </>
      </div>
    </NavLink>
  )
}
