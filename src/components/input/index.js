import classNames from "classnames/bind";
import styles from './input.module.scss'
import { NOT_EMPTY } from "~/enum";

const cx = classNames.bind(styles)

function Input({
    topic,
    type='text',
    state = '',
    setState = ()=>{},
    setRef,
    required = false,
    disabled = false,
    small = false,
    large = false

}) {

    function handleValidate(e) {
        const inputValue = e.target.value;
        setState(inputValue);

        const messageElement = e.target.parentElement.querySelectorAll('span')[2]
        if (messageElement) {
            if (inputValue && inputValue.trim() !== '') {
                messageElement.textContent = '';
            } else {
                messageElement.textContent = NOT_EMPTY
            }
        }
    
    }

    return ( 
        <div className={cx('wapper')}>
            <span className={cx('')}>{topic}</span> {required && <span className={cx('text-danger', 'fs-4')}>*</span>} <br/>
            <input disabled={disabled} onBlur={e=>{handleValidate(e)}} value={state} className={cx('my-input','medium', {small}, {large})} onChange={e=>handleValidate(e)} type={type} name='text'/> <br/>
            <span ref={setRef} className={cx('message')}></span>
        </div>
     );
}

export default Input