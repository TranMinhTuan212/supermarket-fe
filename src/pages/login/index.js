import classNames from "classnames/bind";
import styles from "./login.module.scss";
import FormLogin from "~/components/form-login";

const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("wapper")}>
      <div className={cx("form-login")}>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
