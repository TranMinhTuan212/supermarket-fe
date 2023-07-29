import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faKey, faLock, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { userKey, imageLink } from "~/key";
import Button from "../button/index.js";
import { useNavigate } from "react-router-dom";
import { pages } from "~/config";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLogin } from "~/provider/action";

const cx = classNames.bind(styles);

function Content({ children }) {

  const user = JSON.parse(localStorage.getItem(userKey));

  const navigate = useNavigate()
  const [,dispatch] = useGlobalState()
  
  function handleLogout(){
    localStorage.setItem(userKey, null)
    dispatch(setLogin(null))
    navigate(pages.login)
  }

  if(!user){
    navigate(pages.login)
  }

  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        <div className={cx("cart")}>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
        <div className={cx('user-wapper')}>
        <div className={cx("user")}>
          { user && <img
            className={cx("full")}
            src={ user.profileImage !== null ? imageLink + user.profileImage : imageLink+'default-avt.jpg'}
            alt=""
          /> }
          <ul className={cx("information")}>
            <li className={cx("information-item")}><Button icon={faLock} textButton text="Đăng Nhập"/></li>
            <li className={cx("information-item")}><Button icon={faKey} textButton text="Đổi Mật Khẩu"/></li>
            <li className={cx("information-item")}><Button icon={faUser} textButton text="Thông Tin"/></li>
            <li className={cx("information-item")}><Button onSubmit={handleLogout} icon={faRightFromBracket} textButton text="Đăng Xuất"/></li>
          </ul>
        </div>
        </div>
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
}

export default Content;
