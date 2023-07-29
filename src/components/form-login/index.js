import classNames from "classnames/bind";
import styles from "./form-login.module.scss";
import Input from "../input";
import Button from "../button";
import { useRef, useState } from "react";
import { notEmpty, validateForm } from "~/validation";
import axios from "axios";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading, setUser } from "~/provider/action";
import { useNavigate } from "react-router-dom";
import { pages } from "~/config";
import { apiLink, userKey } from "~/key";

const cx = classNames.bind(styles);

function FormLogin() {

  const navigate = useNavigate()

  const [, dispatch] = useGlobalState()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()

    function handleSubmit(){
        let flag = true

        const validateEmail = validateForm(email, [notEmpty])
        if(typeof validateEmail === 'string'){
            flag = false
            emailRef.current.textContent = validateEmail
        }

        const validatePassword = validateForm(password, [notEmpty])
        if(typeof validatePassword === 'string'){
            flag = false
            passwordRef.current.textContent = validateEmail
        }

        if(flag){
            const formData = {
                email: email,
                password: password
            }
            dispatch(setLoading(true))
              axios.post(`${apiLink}user/login`, formData)
            .then(response=>{
              if(response.data.status === 200){
                const user = {
                  email: response.data.data.userInfo.email,
                  name: response.data.data.userInfo.name,
                  profileImage: response.data.data.userInfo.profileImage,
                  accessToken: response.data.data.accessToken,
                  refreshToken: response.data.data.refreshToken,
                }
                localStorage.setItem(userKey, JSON.stringify(user))
                const userLogin = {
                  email: response.data.data.userInfo.email,
                  name: response.data.data.userInfo.name,
                  profileImage: response.data.data.userInfo.profileImage
                }
                dispatch(setUser(userLogin))
                navigate(pages.home)
              }else{
                if(response.data.status === 500){
                  alert('Tên đăng nhập hoặc mật khẩu không đúng !')
                }else{
                  alert('Có lỗi !!!')
                }
              }
              dispatch(setLoading(false))
            })
            .catch((error)=>{
              if(error.response && error.response.status === 401){
                localStorage.setItem(userKey, null)
                navigate(pages.login)
                alert('Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !')
              }else{
                alert('Có lỗi, thử lại sau')
              }
              dispatch(setLoading(false))
            })
        }
    }

  return (
    <div className={cx("wapper")}>
      <h1 className={cx("text-center", "fw-bold")}>Đăng Nhập</h1>
      <Input setRef={emailRef} state={email} setState={setEmail} topic="Nhập email" required={true} />
      <Input type="password" setRef={passwordRef} state={password} setState={setPassword} topic="Nhập mật khẩu" required={true} />
      <Button large onSubmit={handleSubmit} text="Đăng Nhập" />
    </div>
  );
}

export default FormLogin;
