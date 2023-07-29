import classNames from "classnames/bind";
import styles from "./sideBar.module.scss";
import Menu from "../menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAtom, faPenToSquare, faList, faUserPlus, faKey } from "@fortawesome/free-solid-svg-icons";
import { pages } from "~/config";

const cx = classNames.bind(styles);

function SideBar({width, onWidth}) {
  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        {
            width && <div className={cx("logo")}>
          <img
            className={cx("logo-image")}
            src={process.env.PUBLIC_URL + "/images/logo_home.png"}
            alt=""
          />
        </div>
        }
        {
            width && <div className={cx("shop-name")}>SUPERMAKET</div>
        }
        <div className={cx('navigation')}>
            { width && <div onClick={onWidth} className={cx('navigation-item')}><FontAwesomeIcon icon={faAngleLeft} /></div> }
            { !width && <div onClick={onWidth} className={cx('navigation-item')}><FontAwesomeIcon icon={faAngleRight} /></div> }
        </div>
      </div>

      <div className={cx("list-menu")}>
        <Menu icon={faAtom} name={"Giới thiệu dự án"} to={pages.home} width={width} />
        <Menu icon={faPenToSquare} name={"Thêm Sản Phẩm"} to={pages.add} width={width} />
        <Menu icon={faList} name={"Danh Sách Sản Phẩm"} to={pages.listProductAdmin} width={width} />
        <Menu icon={faUserPlus} name={"Thêm Người Dùng"} to={pages.register} width={width} />
        <Menu icon={faKey} name={"Đổi Mật Khẩu"} to={pages.password} width={width} />
      </div>
    </div>
  );
}

export default SideBar;
