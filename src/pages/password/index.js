import classNames from "classnames/bind";
import styles from './password.module.scss'
import Input from "~/components/input";
import { useState } from "react";
import { useRef } from "react";
import Button from "~/components/button";
import { notEmpty, validateForm } from "~/validation";
import { apiLink, userKey } from "~/key";
import { pages } from "~/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading } from "~/provider/action";

const cx = classNames.bind(styles)

function Password() {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const passwordRef = useRef()
    const newPasswordRef = useRef()
    const reNewPasswordRef = useRef()

    const navigate = useNavigate()
    const [,dispatch] = useGlobalState()

    function handleSubmit(){

        let flag = true

        const validatePassword = validateForm(password, [notEmpty])
        if(typeof validatePassword === 'string'){
            flag = false
            passwordRef.current.textContent = validatePassword
        }

        const validateNewPassword = validateForm(newPassword, [notEmpty])
        if(typeof validateNewPassword === 'string'){
            flag = false
            newPasswordRef.current.textContent = validateNewPassword
        }

        const validateReNewPassword = validateForm(rePassword, [notEmpty])
        if(typeof validateReNewPassword === 'string'){
            flag = false
            reNewPasswordRef.current.textContent = validateReNewPassword
        }

        if(flag){
            const data = {
                password: password,
                newPassword: newPassword,
                rePassword: rePassword
            }
            const user = JSON.parse(localStorage.getItem(userKey))
            if(!user){
                navigate(pages.login)
            }
            const headers = {
                Authorization: `Bearer ${user.accessToken}`
            }

            dispatch(setLoading(true))
            axios.put(`${apiLink}user/change-password`, data, { headers })
            .then(response => {
                if(response.data.status === 200){
                    alert('Đổi mật khẩu thành công !')
                }else{
                    if(response.data.status === 500){
                        alert(response.data.message)
                    }else{
                        alert('Có lỗi, vui lòng thử lại')
                    }
                }
                setPassword('')
                setNewPassword('')
                setRePassword('')
                dispatch(setLoading(false))
            })
            .catch(error=>{
                alert('Có lỗi, thử lại sau')
                dispatch(setLoading(false))
            })
        }


        
    }

    return ( 
        <div className={cx('wapper')}>
            <div className={cx('topic')}>
                <h1 className={cx('topic-content')}>Đổi mật khẩu</h1>
            </div>
            <div className={cx('form')}>
                <Input required setRef={passwordRef} state={password} setState={setPassword} type="password" topic="Nhập mật khẩu cũ"/>
                <Input required setRef={newPasswordRef} state={newPassword} setState={setNewPassword} type="password" topic="Nhập mật khẩu mới"/>
                <Input required setRef={reNewPasswordRef} state={rePassword} setState={setRePassword} type="password" topic="Nhập lại mật khẩu cũ"/>
                <Button onSubmit={handleSubmit} text="Lưu"/>
            </div>
        </div>
     );
}

export default Password;