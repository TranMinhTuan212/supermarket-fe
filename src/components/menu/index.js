import { NavLink } from "react-router-dom";
import styles from "./menu.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function Menu({ width, icon, name, to }) {
  return (
    <NavLink
      to={to}
      className={cx("wapper")}
      style={({ isActive }) =>
        isActive
          ? {
              background: "#0f766e",
            }
          : {}
      }
    >
      <div className={cx("menu")}>
        <div className={cx("menu-icon")}>
          <FontAwesomeIcon icon={icon} />
        </div>
        {width && <div className={cx("menu-name")}>{name}</div>}
      </div>
    </NavLink>
  );
}

export default Menu;
