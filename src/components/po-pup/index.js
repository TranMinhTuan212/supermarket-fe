import classNames from "classnames/bind";
import styles from "./po-pup.module.scss";
import Button from "../button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "~/provider/useGlobalState";
import { setPoPup } from "~/provider/action";

const cx = classNames.bind(styles);

function PoPup({ type = false, text = "" }) {
  const [, dispatch] = useGlobalState();

  return (
    <div className={cx("wapper")}>
      {!type ? (
        <div className={cx("icon", "text-danger")}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      ) : (
        <div className={cx("icon", "text-success")}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
      )}
      <div className={cx("type")}>{!type ? "Thất bại" : "Thành công"}</div>
      <div className={cx("text")}>{text}</div>
      <div className={cx("button")}>
        <Button onSubmit={() => dispatch(setPoPup(null))} text="Đóng" />
      </div>
    </div>
  );
}

export default PoPup;
