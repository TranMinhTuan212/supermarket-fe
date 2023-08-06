import classNames from "classnames/bind";
import styles from "./register.module.scss";
import Input from "~/components/input";
import Dropdown from "~/components/dropdown";
import { useRef, useState } from "react";
import { ROLE } from "~/enum";
import Button from "~/components/button";
import { notEmpty, validateForm } from "~/validation";
import axios from "axios";
import { apiLink, userKey } from "~/key";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading, setPoPup } from "~/provider/action";
import { useNavigate } from "react-router-dom";
import { pages } from "~/config";

const cx = classNames.bind(styles);

function Register() {
  const [, dispatch] = useGlobalState();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const roleRef = useRef();
  const resetRef = useRef();

  function handleRegister() {
    let flag = true;

    const nameValidate = validateForm(name, [notEmpty]);
    if (typeof nameValidate === "string") {
      flag = false;
      nameRef.current.textContent = nameValidate;
    }

    const emailValidate = validateForm(email, [notEmpty]);
    if (typeof emailValidate === "string") {
      flag = false;
      emailRef.current.textContent = emailValidate;
    }

    const phoneValidate = validateForm(phone, [notEmpty]);
    if (typeof phoneValidate === "string") {
      flag = false;
      phoneRef.current.textContent = phoneValidate;
    }

    const roleValidate = validateForm(role, [notEmpty]);
    if (typeof roleValidate === "string") {
      flag = false;
      roleRef.current.textContent = roleValidate;
    }

    if (flag) {
      const data = {
        name: name,
        email: email,
        phone: phone,
        role: role,
      };
      const user = JSON.parse(localStorage.getItem(userKey))
      if (!user) {
        return navigate(pages.login);
      }
      const headers = {
        Authorization: `Bearer ${user.accessToken}`,
      }
        dispatch(setLoading(true));
        axios
          .post(apiLink + "user/register", data, { headers })
          .then((response) => {
            if (response.data.status && response.data.status === 200) {
              dispatch(setPoPup({ type: true, text: response.data.message }))
            } else {
              dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
            }
            setName("");
            setEmail("");
            setPhone("");
            resetRef.current.selectedIndex = 0;
          })
          .then(() => dispatch(setLoading(false)))
          .catch((error)=>{
            if(error.response && error.response.status === 401){
              localStorage.setItem(userKey, null)
              dispatch(setPoPup({ type: false, text: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !' }))
              navigate(pages.login)
            }else{
              dispatch(setLoading(false))
              dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
            }
            dispatch(setLoading(false))
          })
    }
  }

  return (
    <div className={cx("wapper")}>
      <h1 className={cx("topic")}>Thêm người dùng</h1>
      <div className={cx("content")}>
        <Input
          setRef={nameRef}
          state={name}
          setState={setName}
          required
          topic={"Họ và tên"}
        />
        <Input
          setRef={emailRef}
          state={email}
          setState={setEmail}
          required
          topic={"Email"}
        />
        <Input
          setRef={phoneRef}
          state={phone}
          setState={setPhone}
          required
          topic={"Số điện thoại"}
        />
        <Dropdown
          resetRef={resetRef}
          setRef={roleRef}
          setState={setRole}
          topic="Chọn vai trò"
          data={[
            { name: "Nhà cung cấp", id: ROLE.SUPPLIER },
            { name: "Cửa Hàng", id: ROLE.STORE },
          ]}
        />
      </div>
      <Button onSubmit={handleRegister} text="Đăng ký" />
    </div>
  );
}

export default Register;
