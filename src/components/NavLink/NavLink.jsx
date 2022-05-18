import React from "react";
import styles from './NavLink.module.css'

export class NavLink extends React.Component {
  render() {
    const { link, caption, icon } = this.props;

    return (
      <div className={styles.container} onClick={this.props.onClick}>
        {icon}
        <a
          className={`text text_type_main-default ${styles.caption} ${this.props.isActive ? styles.caption_active : 'text_color_inactive'}`}
          href={link}
        >
          {caption}
        </a>
      </div>
    )
  }
}
